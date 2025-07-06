# Cursor AI Context Management Guide

## File Organization for Cursor AI

### Directory Structure
```
project-root/
├── .ai/                     # AI reads this for context
│   ├── .notes/              # AI ignores this (private notes)
│   └── analysis/            # Session management
│       ├── s01/             # Session 01
│       ├── s02/             # Session 02
│       └── ...
└── .cursor/                 # Cursor configuration (AI reads)
```

### Session Workflow

**Step 1: Discussion Phase**
- Discuss and analyze until you're satisfied with the specification
- Do NOT request code changes during this phase

**Step 2: Implementation Phase**
- Only after discussion is complete, request code artifacts
- AI will implement the discussed changes

---

## File Naming Conventions

### AI-Visible Files (Cursor reads these):
- `.ai/cursor-ai-guide.md` - This guide
- `.ai/project-context.md` - Project-specific context (TODO, then migrate to .cursor/rule)
- `.ai/coding-standards.md` - Your coding preferences (TODO, then migrate to .cursor/rule)
- `.ai/analysis/s00/user_input.md` - Current session requirements (e.g. session 00)
- `.ai/analysis/s00/ai_output.md` - Current session output summary (e.g. s00)
- `.ai/analysis/s00/artifacts/*` - Current session artifacts (e.g. s00)
- `.cursor/` - Cursor configuration files

### AI-Ignored Files (private notes):
- `.ai/.notes/*` - AI-related private notes

---

## Essential Context Files

### 1. Create: `.ai/project-context.md`
```markdown
# DRED Project Context

## Architecture
- Distributed messaging system with Redis backend
- Node.js, TypeScript, WebSockets
- Docker deployment on VPS

## Key Components
- Client: src/client/
- Server: src/server/
- Replication: src/server/DredReplicator.ts
- Peer Discovery: src/peers/

## Technology Stack
- Node.js with Express
- Redis for message storage
- WebSocket connections
- Jest for testing
```

### 2. Create: `.ai/coding-standards.md`
```markdown
# Coding Standards

## TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface over type for object shapes

## Code Organization
- One class per file
- Barrel exports from index.ts
- Tests in __tests__/ subdirectories

## Error Handling
- Use Result<T, E> pattern for operations that can fail
- Log errors with structured logging
- Graceful degradation for non-critical failures
```

### 3. Create: `.cursor/` directory
Place Cursor-specific configuration files here.

---

## Session Management

### Starting a New Session
1. Create `sessions/x01/` (increment number)
2. Write `01-input.md` with your requirements
3. Start discussion with AI
4. AI updates `02-discussion.md` during conversation
5. Only request implementation after discussion is complete
6. AI writes `03-changes.md` after implementation

### Template for `01-input.md`:
```markdown
# Session X01: [Brief Title]

## Problem
Describe what needs to be solved.

## Requirements
- List specific requirements
- Include acceptance criteria
- Mention constraints

## Files Involved
- List relevant files
- Mention new files needed

## Context
- Any additional context
- Related discussions or decisions
```

### Template for `02-discussion.md`:
```markdown
# Session X01: Discussion

## Analysis
[AI fills this during discussion]

## Proposed Solution
[AI fills this during discussion]

## Trade-offs
[AI fills this during discussion]

## Implementation Plan
[AI fills this during discussion]
```

---

## Workflow Summary

1. **Session Setup**: Create `sessions/x0X/` with `01-input.md`
2. **Discussion**: Chat with AI, who updates `02-discussion.md`
3. **Refinement**: Iterate on solution until satisfied
4. **Implementation**: Request code changes only after discussion complete
5. **Documentation**: AI creates `03-changes.md` summarizing changes

This workflow ensures thorough analysis before implementation and maintains clear documentation of decisions. 