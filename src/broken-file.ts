// This file is deliberately broken to test the build failure notification
import { ThisModuleDoesNotExist } from 'non-existent-module';
import { AnotherFakeModule } from './this-file-does-not-exist';

// Syntax error - missing semicolon and unclosed function
function breakBuild() {
    const x = 5
    console.log("This won't compile")
    return x.nonExistentMethod()

// Missing closing brace - will cause build to fail

// More deliberate errors
const anotherBrokenFunction = () => {
  const y = "string"
  y = 42 // Type error - reassigning a string to a number
  
  return y.split(1) // Another error - split takes a string
}

export const brokenExport = new ThisClassDoesNotExist(); 