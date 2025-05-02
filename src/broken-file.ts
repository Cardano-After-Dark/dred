// This file is deliberately broken to test the build failure notification
import { ThisModuleDoesNotExist } from 'non-existent-module';

// Syntax error - missing semicolon and unclosed function
function breakBuild() {
    const x = 5
    console.log("This won't compile")
    return x.nonExistentMethod()

// Missing closing brace - will cause build to fail

export const brokenExport = new ThisClassDoesNotExist(); 