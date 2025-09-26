// Fix Option 2: Proper AbortController Cleanup
// Location: src/client/HostConnection.ts

// Add to class properties:
private _abortHandler?: () => void;
private _destroyed = false;

// In connect() method around line 315:
async connect(): Promise<any | never> {
    if (this.connecting) return this.connecting;

    this.abortController = new AbortController();
    const { signal } = this.abortController;
    
    // Store bound handler for cleanup
    this._abortHandler = () => {
        if (!this._destroyed && this && typeof this.transition === 'function') {
            this.transition("abort");
        }
    };
    
    signal.addEventListener("abort", this._abortHandler);
    
    // ... rest of connect method
}

// Enhanced disconnect method:
disconnect(reason: string) {
    this._destroyed = true;
    
    // Clean up abort listener BEFORE aborting
    if (this.abortController && this._abortHandler) {
        this.abortController.signal.removeEventListener("abort", this._abortHandler);
        this._abortHandler = undefined;
    }
    
    // Now safe to abort
    if (this.abortController) {
        this.abortController.abort(`disconnect(): ${reason}`);
    }
    
    this.stopRetries();
}

// Add cleanup method for proper resource disposal:
cleanup() {
    this._destroyed = true;
    
    if (this._abortHandler && this.abortController) {
        this.abortController.signal.removeEventListener("abort", this._abortHandler);
        this._abortHandler = undefined;
    }
    
    this.stopRetries();
}
