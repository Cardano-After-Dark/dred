# Quick Guide to Claude Code

**Installation:**
```
npm install -g @anthropic-ai/claude-code
```

**Basic Usage:**
1. Navigate to your project directory
2. Run `claude` to start an interactive session
3. Ask questions or request changes in natural language

**Common Tasks:**
- **Understand code**: "What does this project do?"
- **Make changes**: "Add error handling to the login function"
- **Debug**: "Fix the failing tests in auth.test.js"
- **Git operations**: "commit my changes" or "create a pull request"

**Essential Commands:**
- `claude` - Start interactive mode
- `claude "task"` - Run one-time task
- `/help` - Show available commands
- `exit` - Close session

**Tips:**
- Be specific with your requests
- Let Claude explore code before making changes
- Break complex tasks into smaller steps

For more details: `/help` or visit https://docs.claude.com/en/docs/claude-code/

## Project-Specific Context

Claude Code reads configuration and context from these files in your project:

**Primary options:**

1. **`.claude/README.md`** (Recommended)
   - Project overview, architecture, workflows
   - How to run/build/test/deploy
   - Important conventions and gotchas

2. **`.claude/context.md`**
   - Additional context loaded into every conversation
   - Good for frequently needed information

3. **`.clauderc` or `.claude/config.json`**
   - Settings like custom commands, hooks, output styles

**Best practice for your use case:**

Create `.claude/README.md` with sections like:

```markdown
# Project Overview
[Brief description of what this project does]

## Local Development
Run locally: `npm run dev` (or your command)

## Testing
Run tests: `npm test` (or vitest command)

## Deployment
Pre-prod: [explain pre-prod deployment process and commands]
Production: [if applicable]

## Architecture Notes
[Key information about communication setup, important files, etc.]
```

Claude Code automatically reads `.claude/README.md` at the start of conversations, so you won't need to repeat this context.