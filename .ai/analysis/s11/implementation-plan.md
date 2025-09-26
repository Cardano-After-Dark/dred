# Implementation Plan for Fixing Unhandled Promise Rejection

## Problem Summary
The test is experiencing an unhandled promise rejection: `Cannot read properties of undefined (reading 'valueOf')` during cleanup. This is caused by a race condition where the StateMachine context becomes undefined while an abort signal handler is trying to execute a state transition.

## Root Cause
1. Client disconnect triggers `abortController.abort()`
2. Abort signal fires asynchronously 
3. Signal handler calls `this.transition("abort")`
4. But `this` context has been cleaned up/garbage collected
5. StateMachine tries to call `valueOf()` on undefined context

## Recommended Solution: Comprehensive Fix

### Phase 1: Fix HostConnection Race Condition
**File**: `src/client/HostConnection.ts`
**Changes**:
- Add `_abortHandler` property and `_destroyed` flag
- Store abort handler reference for proper cleanup
- Remove event listener before calling abort
- Add defensive checks in abort handler

### Phase 2: Enhance ConnectionManager Cleanup
**File**: `src/client/ConnectionManager.ts`
**Changes**:
- Call connection cleanup before disconnect
- Add error handling for individual connection cleanup

### Phase 3: Add DredClient Cleanup
**File**: `src/client/DredClient.ts`
**Changes**:
- Add cleanup method that calls connection manager cleanup
- Enhance disconnect to call cleanup first

### Phase 4: Improve Test Cleanup Order
**File**: `src/server/testServer.ts`
**Changes**:
- Phase cleanup: explicit cleanup → replication cleanup → event loop wait → disconnect → server reset
- Add small delays to allow async operations to complete
- Better error handling for each cleanup phase

## Implementation Steps

1. **Start with HostConnection fix** - This addresses the immediate race condition
2. **Test the fix** - Run `pnpm test newrep` to verify the error is resolved
3. **Add remaining enhancements** - If needed, add the other cleanup improvements
4. **Validate with full test suite** - Ensure no regressions in other tests

## Risk Assessment
- **Low Risk**: The fixes are defensive and add proper cleanup without changing core logic
- **Backwards Compatible**: All changes maintain existing API contracts
- **Focused**: Changes target the specific race condition without broad refactoring

## Testing Strategy
1. Run the failing test repeatedly to ensure fix is stable
2. Run full test suite to check for regressions
3. Test with different timing conditions (if possible)
4. Verify no new unhandled promise rejections appear

## Expected Outcome
- Elimination of the unhandled promise rejection error
- More robust cleanup process
- Better error handling during test teardown
- No impact on normal application behavior
