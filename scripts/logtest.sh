#!/bin/bash

# logtest - Test logging and comparison utility
#
# Usage:
#   ./scripts/logtest.sh [testname]           # Run tests and save logs  
#   ./scripts/logtest.sh diff [testname]      # Compare last two test runs
#
# Examples:
#   ./scripts/logtest.sh                      # Run all tests
#   ./scripts/logtest.sh message              # Run message tests  
#   ./scripts/logtest.sh diff                 # Compare last two "all" runs
#   ./scripts/logtest.sh diff message         # Compare last two "message" runs

# Parse command and test name
if [ "$1" = "diff" ]; then
    COMMAND="diff"
    TEST_NAME="${2:-all}"
else
    COMMAND="run"
    TEST_NAME="${1:-all}"
fi

TIMESTAMP=$(date +%y%m%d-%H%M%S)

# ===== RUN TESTS =====
if [ "$COMMAND" = "run" ]; then
    LOG_DIR="testing/log/${TIMESTAMP}-${TEST_NAME}"
    mkdir -p "$LOG_DIR"
    
    echo "Running tests and saving output to: $LOG_DIR/output.log"
    echo "----------------------------------------"
    
    if [ "$TEST_NAME" = "all" ]; then
        # Show colored output in console, save cleaned output to file
        pnpm test | pnpm exec pino-pretty | tee >(sed 's/\x1b\[[0-9;]*m//g' | sed -E 's/\[[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+\]//g' > "$LOG_DIR/output.log")
    else
        # Show colored output in console, save cleaned output to file
        pnpm test "$TEST_NAME" | pnpm exec pino-pretty | tee >(sed 's/\x1b\[[0-9;]*m//g' | sed -E 's/\[[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+\]//g' > "$LOG_DIR/output.log")
    fi
    
    echo "----------------------------------------"
    echo "Log saved to: $LOG_DIR/output.log"
    
    # Check if we can suggest diff
    if ls testing/log/*-${TEST_NAME}/ >/dev/null 2>&1; then
        COUNT=$(ls -1d testing/log/*-${TEST_NAME}/ 2>/dev/null | wc -l)
        if [ "$COUNT" -gt 1 ]; then
            echo "💡 Tip: Run 'pnpm logtest diff $TEST_NAME' to compare with previous run"
        fi
    fi

# ===== COMPARE LOGS =====
else
    # Find last two log directories for this test
    LOGS=($(ls -1dt testing/log/*-${TEST_NAME}/ 2>/dev/null | head -2))
    
    if [ ${#LOGS[@]} -lt 2 ]; then
        echo "Error: Need at least 2 test runs for '$TEST_NAME' to compare"
        exit 1
    fi
    
    LATEST="${LOGS[0]}output.log"
    PREVIOUS="${LOGS[1]}output.log"
    
    echo "Comparing: $(basename ${LOGS[1]}) → $(basename ${LOGS[0]})"
    echo "----------------------------------------"
    
    # Open files in IDE diff view instead of creating text diff
    if command -v cursor >/dev/null; then
        echo "Opening diff in Cursor..."
        cursor --diff "$PREVIOUS" "$LATEST"
    elif command -v code >/dev/null; then
        echo "Opening diff in VSCode..."
        code --diff "$PREVIOUS" "$LATEST"
    else
        echo "No supported editor found (cursor/code)."
        echo "You can manually compare these files:"
        echo "  Previous: $PREVIOUS"
        echo "  Latest:   $LATEST"
    fi
    
    echo "Comparison opened in IDE!"
fi 