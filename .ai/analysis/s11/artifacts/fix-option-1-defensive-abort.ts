// Fix Option 1: Defensive Abort Handler
// Location: src/client/HostConnection.ts around line 315

// BEFORE (problematic code):
signal.addEventListener("abort", () => {
    this.transition("abort");
});

// AFTER (defensive code):
const abortHandler = () => {
    // Defensive check to prevent undefined.valueOf() error
    if (this && typeof this.transition === 'function' && !this._destroyed) {
        try {
            this.transition("abort");
        } catch (error) {
            // Log the error but don't let it become an unhandled promise rejection
            console.warn('Error during abort transition:', error);
        }
    }
};

signal.addEventListener("abort", abortHandler);

// Store reference for cleanup
this._abortHandler = abortHandler;
