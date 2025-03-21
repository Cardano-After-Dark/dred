import { jest, beforeAll, afterAll, afterEach } from '@jest/globals';

// Increase the default timeout for all tests
jest.setTimeout(10000);

beforeAll(() => {
    // Ensure clean state before all tests
    jest.clearAllMocks();
});

afterEach(async () => {
    // Clean up after each test
    jest.clearAllMocks();
    jest.clearAllTimers();
    await new Promise(resolve => setTimeout(resolve, 100));
});

// Ensure proper cleanup after all tests
afterAll(async () => {
    // Add a longer delay to ensure all async operations complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Force cleanup of any remaining handles
    if (process.env.NODE_ENV === 'test') {
        // @ts-ignore - accessing internal property
        if (process._getActiveHandles && process._getActiveHandles().length > 0) {
            console.warn('Active handles detected after tests, forcing cleanup...');
        }
    }
}); 