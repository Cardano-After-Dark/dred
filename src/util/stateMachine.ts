/**
 * copied from stellar-contracts
 */
import { EventEmitter } from "eventemitter3";
import type {
    ResolveablePromise,
    WrappedPromise,
} from "./cancellablePromise.js";

type transitionEventInfo<SM extends StateMachine<any, any>> = {
    from: $states<SM>;
    transition: string;
    to: $states<SM>;
    cancelTransition: (reason: string) => void;
};

export type StateMachineEmitter<SM extends StateMachine<any, any>> = {
    changed: [SM];
    [`transition`]: [SM, transitionEventInfo<SM>];
    [`state:entered`]: [SM, string /* $states<SM> - XXX causes type-resolution loop */];
    [`destroyed`]: [SM];
    [`backoff`]: [SM, number, string /* $transitions<SM> - XXX causes type-resolution loop */];
    // } & { // EventEmitter3 doesn't recognize this approach : /
    //     [k in $states<SM> as string]: [SM, k];
};

export type $states<SM extends StateMachine<any, any>> =
    SM extends StateMachine<infer S, any> ? S : never;

export type $transitions<SM extends StateMachine<any, any>> =
    SM extends StateMachine<any, infer T> ? T : never;

export type AnyPromise<T> =
    | Promise<T>
    | WrappedPromise<T>
    | ResolveablePromise<T>;

export type DeferredStateMachineAction<
    SM extends StateMachine<any, any>,
    TYPE extends "state" | "transition"
> = {
    type: TYPE;
    promise: AnyPromise<any>;
    displayStatus: string;
} & (TYPE extends "state"
    ? {
          targetState: $states<SM>;
      }
    : TYPE extends "transition"
    ? {
          transitionName: $transitions<SM>;
      }
    : never);

export type DeferredTransition<SM extends StateMachine<any, any>> =
    DeferredStateMachineAction<SM, "transition">;

export type DeferredState<SM extends StateMachine<any, any>> =
    DeferredStateMachineAction<SM, "state">;

let instanceId = 0

export abstract class StateMachine<
    STATES extends string,
    TRANSITIONS extends string
> {
    $state: STATES;
    $notifier: EventEmitter<StateMachineEmitter<this>>;
    destroyed = false;
    _deferredSMAction?: DeferredStateMachineAction<this, any>;
    abstract transitionTable: StateTransitionTable<STATES, TRANSITIONS>;
    instanceId: number
    abstract resetState(): any;
    constructor() {
        this.instanceId = instanceId++;
        this.$state = this.initialState;
        this.$notifier = new EventEmitter();
        Object.defineProperty(this, "$notifier", { 
            enumerable: false,
        });
        this.resetState();
        this.onStateEntered = this.onStateEntered.bind(this);
        this.$notifier.on("state:entered", 
            // avoid type-resolution loop with any cast
            this.onStateEntered as any
        );
    }

    get $deferredAction() {
        const deferredAction = this._deferredSMAction as any;
        if (!deferredAction) return "";
        const { type, displayStatus } = deferredAction;
        return displayStatus
    }
    get $describeDeferredAction() {
        const deferredAction = this._deferredSMAction as any;
        if (!deferredAction) return "";
        const { type, displayStatus } = deferredAction;
        const nextThing = deferredAction?.targetState || deferredAction?.transitionName;

        return `(deferred ${type} '${nextThing}'): ${displayStatus}`;
    }

    get deferredTargetState() : STATES | "" {
        const deferredAction = this._deferredSMAction as any 
        if (!deferredAction) return "";
        if (deferredAction.targetState) return deferredAction.targetState as STATES;

        const currentState = this.$state;
        if (!currentState) return "";
        const currentTransition = deferredAction.transitionName as TRANSITIONS
        const transitionsAvailable = this.transitionTable[currentState]
        if (!transitionsAvailable) {
            throw new Error(`🍓🍸 ${this.stateMachineName}: deferred transition (${currentTransition}) invalid from ${currentState} (no transitions defined)`)
        }
        const transition = transitionsAvailable[currentTransition]
        if (!transition) {
            throw new Error(`🍓🍸 ${this.stateMachineName}: deferred transition (${currentTransition}) invalid from state: ${currentState}`)
        }
        return transition.to;
    }

    /**
     * schedules a deferred transition to be performed when the promise resolves
     * @remarks
     * When there is a deferred transition, the state-machine will not accept other
     * transitions until the promise resolves one way or the other.
     *
     * A prime use-case for a deferred transition is for an onEntry hook to
     * defer (with setTimeout()) an unconditional next activity that will be
     * triggered by transitioning to the next state.
     * 
     * The displayStatus is used to provide transparency about the
     * implied "activity" of waiting to trigger the transition.  For instance,
     * a "doneCooking" state on a microwave might have a displayStatus of
     * "food is ready", with a 2m-deferred transition to "remindingReady" state,
     * where it beeps three times and returns to doneCooking for further
     * reminders (opening the door or pressing Cancel would interrupt and
     * prevent the deferred transition).
     * 
     * ### Return-type notes
     * Note that the returned type is not usable as result of an
     * onTransition hook or onEntry hook.  In onTransition, you can return
     * `this.$deferredState(...)`.  To use `$deferredTransition(...)` in onEntry,
     * just call it and don't return it.
     */
    $deferredTransition(
        this: this,
        tn: TRANSITIONS,
        displayStatus: string,
        promiseOrDelay: number | AnyPromise<any>,
    ) {
        if (this._deferredSMAction) {
            this.warn("existing action: ", this._deferredSMAction);
            throw new Error(
                `🍓🍸 ${this.stateMachineName} already has a deferred action pending`
            );
        }
        let promise: AnyPromise<any> = promiseOrDelay as any;
        let delay : string = ""
        if ("number" == typeof promiseOrDelay) {
            delay = `@ +${promiseOrDelay}ms`
            promise = this.delayed(promiseOrDelay);
        }

        const pAction: DeferredTransition<this> = {
            type: "transition",
            transitionName: tn as any,
            displayStatus,
            promise,
        };

        this._deferredSMAction = pAction;
        const p: Promise<any> = (promise as any).promise ?? promise;

        this.progress(`\n  -- scheduled! ${delay} ⏰`);
        this.ignoringListenerErrors("changed", () => {
            this.$notifier.emit("changed", this);
        })
        p.then(
            () => {
                if (!this._deferredSMAction) {
                    // todo: this cancellation isn't actually performed yet,
                    // but when the code is changed to do that, verify that
                    // this shows as expected.
                    this.trace(
                        `    -- deferred transition ${tn} already triggered 👍`
                    );
                    return;
                }
                if (this.destroyed) {
                    this.debug(" -- was destroyed; abandoning deferred transition");
                }                    
                this._deferredSMAction = undefined;
                this.progress("    -- triggering deferred state transition");
                this.transition(tn);
            },
            () => {
                this._deferredSMAction = undefined;
            }
        );
        return pAction;
    }

    ignoringListenerErrors(event: string, cb: () => void) {
        try {
            cb();
        }
        catch (e: any) {
            this.warn(`Note: error in '${event}' listener`, e);
        }
    }
    /**
     * Schedules the completion of a deferred transition, placing the
     * state-machine into the target state.
     * @remarks
     * When the context of a particular state-transition has a natural
     * affinity to a delayed effect of triggering a state-change (or to
     * re-initiating the current-state), this method can be used to
     * indicate that deferred effect.
     * 
     * The displayStatus is used to provide transparency about the cause
     * and context of the delayed change-of-state.
     *
     * The deferred transition will be cancelled if the promise is
     * cancelled or fails.
     *
     * A key use-case for this is to allow a transition that can re-trigger
     * the onEntry effects of the current state (or another next state), while
     * remaining cosmetically or semantically in the original state, deferred
     * the deferred entry to the target state; the target state's onEntry
     * hook will then be called after the transition is actually finished.
     * 
     * Meanwhile, there is an explicit block on other state-transitions, and
     * there is an explicit current displayStatus providing strong transparency
     * about the deferred switch to the target state.
     *
     * As an example, a kitchen-timer feature on a microwave might (once it
     * finishes its countdown to zero and is done beeping), trigger a 
     * `$deferredState("idle", ...)` with a deferred displayStatus of "timer finished".  
     * It would then move to idle when the Cancel button is pressed.  This example 
     * differs from that in $deferredTransition(), with the assumption that the
     * kitchen timer doesn't try to bug the user about it being finished,
     * the way the "doneCooking" state example describes. 
     * 
     * ### Return-type notes
     * Note that this type is only valid as the return value of an onTransition
     * callback, and not as a return value of an onEntry hook.  In an onEntry
     * hook, call and don't return the $deferredTransition(...).
     */
    $deferredState(
        this: this,
        transitionName: TRANSITIONS,
        targetState: STATES,
        displayStatus: string,
        promiseOrDelay: number | AnyPromise<any>,
    ) : DeferredState<this> {
        if (this._deferredSMAction) {
            this.warn("existing action: ", this._deferredSMAction);
            throw new Error(
                `🍓🍸 ${this.stateMachineName} already has a deferred action`
            );
        }
        let promise : AnyPromise<any> = promiseOrDelay as any;
        if ("number" == typeof promiseOrDelay) {
            promise = this.delayed(promiseOrDelay);
        }
        const pAction : DeferredState<this> = {
            type: "state",
            promise,
            displayStatus,
            transitionName,
            targetState: targetState as any,
        } as DeferredStateMachineAction<this, "state">;
        this._deferredSMAction = pAction
        const p: Promise<any> = (promise as any).promise ?? promise;
        p.catch(
            () => {
                this.warn(
                    `promise for deferred action cancelled or failed\n` +
                        `  ... NOT committing state -> ${targetState}`
                );
                this._deferredSMAction = undefined;
            }
        );

        return pAction
    }

    async delayed(delay?: number) {
        return new Promise((res) => {
            setTimeout(res, delay);
        })
    }

    onStateEntered(sm : this, state: STATES) {
        const entryHook = this.onEntry[state];
        if (entryHook) {
            entryHook.call(this);
        }
    }

    destroy() {
        this.$notifier.emit("destroyed", this);
        this.$notifier.removeAllListeners();
        //@ts-expect-error
        this.$notifier = "destroyed";
        this.destroyed = true;
    }

    notDestroyed() {
        if (this.destroyed) {
            throw new Error(
                `🍓🍸 ${this.stateMachineName} has already  been destroyed`
            );
        }
    }
    logPrefix() {
        const deferredAction = this._deferredSMAction as any;
        let deferredStatus = deferredAction?.displayStatus;
        let deferredType = deferredAction?.type;
        let nextThing =
            deferredAction?.targetState || deferredAction?.transitionName;
        deferredStatus = deferredStatus
            ? `(deferred ${deferredType} ${nextThing}: ${deferredStatus})`
            : "";
        return `@${this.$state} ${deferredStatus}: `
    }
    
    error(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.error(message, ...args);
        console.error(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }
    warn(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.warn(message, ...args);
        console.warn(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }
    info(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.info(message, ...args);
        console.info(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }
    progress(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.progress(message, ...args);
        console.info(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }
    debug(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.debug(message, ...args);
        console.debug(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }
    trace(message: string, ...args: any[]) {
        //@ts-expect-error
        if (this.logger) return this.logger.trace(message, ...args);
        console.trace(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
    }

    get logLabel() {
        return `🍓🍸 ${this.instanceId} ${this.stateMachineName}`
    }

    onEntry: Partial<{ [state in STATES]: () => void }> = {};

    get stateMachineName() {
        return this.constructor.name;
    }

    get initialState(): STATES {
        throw new Error("abstract");
    }

    /**
     * creates a transition function for the indicated transition name
     * @remarks
     * the prefix brings this most common method to the top for autocomplete
     *
     * the resulting callback will try to transition the state-machine
     * but can fail if the transition table doesn't permit the named transition
     * at the time of the call.
     * @public
     */
    $mkTransition(tn: TRANSITIONS) {
        return this.mkTransition(tn);
    }

    /**
     * creates a transition function for the indicated transition name
     * @remarks
     * The resulting callback will try to transition the state-machine
     * but can fail if the transition table doesn't permit the named transition
     * at the time of the call.
     * @public
     */
    mkTransition(tn: TRANSITIONS) {
        return this.transition.bind(this, tn);
    }

    /**
     * returns true if the state-machine can currently use the named transition
     * @public
     */
    $canTransition(tn: TRANSITIONS) {
        if (this._deferredSMAction) return false;

        return !!this.transitionTable[this.$state][tn];
    }

    /**
     * transitions the state-machine through the indicated tx name
     * @remarks
     * can fail if the transition table doesn't permit the named transition
     * while in the current state.
     *
     * the prefix brings this most common method to the top for autocomplete
     * @public
     */
    $transition(tn: TRANSITIONS) {
        return this.transition(tn);
    }

    /**
     * transitions the state-machine through the indicated tx name
     * @public
     */
    transition(tn: TRANSITIONS) : Promise<void>{
        const currentState = this.$state;
        const foundTransition = this.transitionTable[currentState][tn];
        if (!foundTransition) {
            debugger;
            throw new Error(
                ` 🍓🍸 ${this.stateMachineName}: invalid transition '${tn}' from state=${currentState}`
            );
        }
        const { to: targetState, onTransition } = foundTransition;
        if (this._deferredSMAction) {            
            if( targetState == this.deferredTargetState ) {
                // if the requested transition is to the same state
                // as the deferred action, then we can release the deferred 
                // action.  Make sure that any effects of that deferred action
                // aren't duplicated
                this._deferredSMAction = undefined
            } else {
                this.warn(" -- can't transition with deferred action : ( ")
                throw new Error(
                    `${this.stateMachineName} can't do transition ${tn} with deferred action '${this.$describeDeferredAction}' pending`
                );
            }
        }
        let error = "";
        let nextState: string | false | DeferredState<this>;
        try {
            nextState = (onTransition?.() || targetState) as any;
        } catch (e: any) {
            nextState = false;
            error = e.message || e;
        }
        return this.finishTransition(tn, targetState, currentState, nextState, error) as any
    }

    finishTransition(
        tn: TRANSITIONS,
        targetState: STATES,
        currentState: string,
        nextState: string | false | DeferredState<this>,
        error: string
    ) {
        if (this.destroyed) return undefined;

        let wasCancelled = false;
        if (!error) this.ignoringListenerErrors("transition", () => {
                function mayCancelTransition(reason: string) {
                    wasCancelled = true;
                    error = reason || "‹unknown reason›";
                    nextState = false;
                }
                this.$notifier.emit("transition", this, {
                    from: currentState as $states<this>,
                    transition: tn,
                    to: targetState as $states<this>,
                    cancelTransition: mayCancelTransition,
                })
            })

        if (nextState == false) {
            this.info(
                `transition canceled: ${currentState}: ${tn} XXX ${targetState}` +
                    (wasCancelled
                        ? `\n -- cancelled by 'transition' listener`
                        : "") +
                    (!!error ? ` -- ${error}` : "") +
                    `\n  -- staying in state ${currentState}`
            );
            // "did-change" could be a matter of interpretation
            // this.notifier.emit("changed", this);
            return;
        }
        if (nextState && "string" != typeof nextState) {
            const ns: DeferredState<this> = nextState as any
            const {
                displayStatus,
                promise,
                targetState,
                type
            } = ns
            this._deferredSMAction = ns
            const p = (promise as any).promise ?? promise;
            p.then(
                () => {
                    if (this._deferredSMAction) {
                        this._deferredSMAction = undefined;
                        this.progress(
                            `    --  commit deferred ${type} -> ${targetState}`
                        );
                        return this.finishTransition(
                            tn,
                            targetState,
                            currentState,
                            targetState,
                            ""
                        );
                    }
                }
            )
        } else if (this.$state != currentState) {
            const trampolineState = this.$state;
            this.progress(
                `  -- trampolined ^^ ${currentState}: ${tn} 🏒 -> ~~${nextState}~~  🥅 ${trampolineState} during ${tn} `
            );
            // skipped extra notification
        } else {
            nextState = nextState || targetState;
            const stateRedirect =
                nextState == targetState ? "" : `~~${targetState}~~  -> `;
            this.progress(` -- ${tn} 🏒 -> ${stateRedirect} 🥅 ${nextState}`);
            this.$state = (nextState || targetState) as any;
            this.ignoringListenerErrors("changed", () => {
                this.$notifier.emit("changed", this);
            });
            return new Promise<void>((resolve) => {
                resolve()
                this.ignoringListenerErrors("state:entered", () => {
                    this.$notifier.emit("state:entered", this, this.$state as any);
                })
            })
        }
    }
}

export type StateTransitionTable<S extends string, T extends string> = {
    [state in S]: {
        [transition in T]: null | {
            to: S;
            onTransition?: 
            | (() => void)
             | (() => S) 
             | (() => DeferredState<StateMachine<S, T>>)
             | (() => false) 
             | (() => S | false) 
             | (() => S | false | DeferredState<StateMachine<S, T>>)
             | (() => S | DeferredState<StateMachine<S, T>>)
             | (() => false | DeferredState<StateMachine<S, T>>)
             ;
        };
    };
};
