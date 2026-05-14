/**
 * Promise-based gate for race-condition testing.
 *
 * Production code calls `gate.waitAt(label)` at a chokepoint. When no test
 * pause is installed for that label, the call resolves immediately (zero
 * production cost). When a test has installed a pause via `gate.pause(label)`,
 * the next matching `waitAt(label)` blocks until the test calls `release()`.
 *
 * Pauses on the same label form a FIFO queue: install N pauses, the next N
 * `waitAt` calls each consume one. After the queue is drained, further calls
 * pass through immediately until another pause is installed.
 *
 * Labels are namespaces: include serverId (or any other discriminator) in the
 * label to target specific gate sites — e.g. `"first:inbound:messageHandler"`.
 */

export class Gate {
    private installed: Map<string, PendingPause[]> = new Map();

    /**
     * Production-side: pause here if a test has installed a gate for this label.
     */
    async waitAt(label: string): Promise<void> {
        const list = this.installed.get(label);
        if (!list || list.length === 0) return;
        const next = list.shift()!;
        next.arrivedResolve();
        await next.released;
    }

    /**
     * Test-side: install a one-shot pause at this label. Returns a controller
     * with `arrived` (promise resolving when production code reaches the gate)
     * and `release` (call to let production continue).
     */
    pause(label: string): GatePause {
        let arrivedResolve!: () => void;
        let releaseResolve!: () => void;
        const arrived = new Promise<void>((resolve) => {
            arrivedResolve = resolve;
        });
        const released = new Promise<void>((resolve) => {
            releaseResolve = resolve;
        });
        const entry: PendingPause = { arrivedResolve, released };
        let list = this.installed.get(label);
        if (!list) {
            list = [];
            this.installed.set(label, list);
        }
        list.push(entry);
        return {
            arrived,
            release: () => releaseResolve(),
        };
    }

    /**
     * Test-side: release any pending pauses at this label without arrival.
     * Subsequent waitAt() calls pass through. Useful at test cleanup.
     */
    bypass(label: string): void {
        const list = this.installed.get(label);
        if (!list) return;
        this.installed.delete(label);
    }

    /**
     * Test-side: drain all installed pauses across all labels (cleanup).
     */
    reset(): void {
        this.installed.clear();
    }
}

interface PendingPause {
    arrivedResolve: () => void;
    released: Promise<void>;
}

export interface GatePause {
    /** Resolves when production code reaches this gate. */
    arrived: Promise<void>;
    /** Call to let production code continue past this gate. */
    release: () => void;
}

/**
 * Minimal structural interface for production-side use. Production code
 * declares its `testGate?: TestGate` field with this type to avoid importing
 * the concrete Gate class (and dragging test code into the runtime bundle).
 */
export interface TestGate {
    waitAt(label: string): Promise<void>;
}
