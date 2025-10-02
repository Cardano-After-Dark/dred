# VPS Setup Summary - S08

## Created Structure

```
vps/
├── README.md                   # Main usage guide
├── config/
│   └── servers.conf           # Server IP configuration
└── scripts/
    ├── setup-server.sh        # Infrastructure setup
    ├── deploy-dred.sh         # Code deployment  
    └── run-dred.sh           # Manual DRED execution
```

## Key Design Decisions

### 1. Manual Process Execution
- **No PM2**: Direct Node.js process execution
- **Explicit Environment**: Variables passed via SSH command
- **Foreground Running**: Easy to see logs and stop/start

### 2. Three-Step Workflow  
1. **Infrastructure**: Docker + Redis + Node.js
2. **Code**: Clone + Build + Verify
3. **Run**: Start with environment variables

### 3. Environment Strategy
- **No .env files**: Avoids dotenv loading conflicts
- **Direct SSH variables**: `BF_API_KEY=xxx DRED_NODE_ID=yyy node dist/dredServer.mjs`
- **Unique Node IDs**: Generated per server: `vps-217-154-34-155-timestamp`

## Advantages Over Preprod Approach

| Issue | Preprod | VPS Manual |
|-------|---------|------------|
| Environment Loading | PM2 + dotenv conflicts | Direct variables |
| Debugging | Complex PM2 ecosystem | Direct console output |
| Complexity | 6+ scripts, complex configs | 3 scripts, simple |
| Setup Time | ~15 minutes | ~5 minutes |
| Error Isolation | Hard to debug | Clear error messages |

## Testing Approach

### Expected Success Indicators
1. **Infrastructure**: Redis responding to ping
2. **Build**: `dist/dredServer.mjs` exists  
3. **Runtime**: Environment variables visible in logs
4. **Blockchain**: No "BF_API_KEY is not set" errors
5. **Self-ID**: "Filtered out self-node" messages

### Workflow
```bash
cd vps
./scripts/setup-server.sh 217.154.34.155      # ~2 min
./scripts/deploy-dred.sh 217.154.34.155       # ~3 min  
./scripts/run-dred.sh 217.154.34.155 preprodXXX  # immediate
```

## Next Steps

1. Test on UK server (217.154.34.155)
2. Verify self-identification fix works
3. Document any additional issues
4. Consider multi-server testing if single server works
