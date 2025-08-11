# Session S04 - User Input Summary

## Initial Request
Implement dynamic host discovery using blockchain data for the DRED messaging system, proceeding through multiple phases from test-based implementation to full blockchain integration.

## Clarifying Questions Asked
- Discovery Update Triggers: How should discovery updates be triggered?
- Replication Integration: How to handle replicants during topology changes?
- VPS Testing Approach: Which infrastructure to use for VPS testing?
- Blockchain Data Mapping: How to map blockchain data to DredHostDetails?
- Implementation Priority: What should be implemented first?

## User Responses
**1. Discovery Update Triggers:**
- Initially: test method `server.updateDiscovery(newHosts)` 
- Later (pre-production): find another way to trigger updates with servers running

**2. Replication Integration:**
- Add/remove replicants based on the diff
- During topology changes, received messages should still be delivered

**3. VPS Testing Approach:**
- Disregard pre-prod folder
- Use infrastructure from `.ai/analysis/s01/artifacts` scripts:
  - `make setup-devops [server]` - Step 1: Create devops user + SSH keys
  - `make setup-infra [server]` - Step 2: Install Docker, Redis, Node.js  
  - `make setup-dred [server]` - Step 3: Deploy DRED application
- Copy relevant files from s01/artifacts to s04/artifacts for cleaner approach

**4. Blockchain Data Mapping:**
- Focus on successful blockchain call execution first
- Hardcode mapping via `BlockServerMapper` class (blockchain data → server list)
- Polling limited to: system startup + specific method calls

**5. Implementation Priority:**
1. DynamicHostDiscovery working in tests
2. Use DynamicHostDiscovery in VPSs
3. Test on VPS by changing discovery via command line command
4. Blockchain integration

## Final Requirements
**Gradual Implementation Phases:**
1. Implement dynamic host discovery by passing data from tests ✓
2. Test the dynamic host discovery works on tests ✓  
3. Test the dynamic host discovery works in a setup with multiple servers on different VPSs ✓
4. Test the node replication works in a setup with multiple servers on different VPSs ✓
5. Switch to blockchain node discovery (query blockchain for host discovery list) ✓

**Technical Requirements:**
- Check `DredServer.ts` for current node discovery implementation ✓
- Add method in `DredClient.ts` to tell server to execute discovery with provided data ✓
- Setup/create test where node discovery can be changed dynamically ✓
- Extend VPS deployment (reference `.ai/analysis/s01`) if needed ✓
- Test replication with dynamic discovery switching between servers ✓
- Implement blockchain-based discovery using pattern from `DredCapoTestHelper.ts` ✓

**Blockchain Integration Pattern:**
```typescript
async findFirstNode() {
    const registryDgt = await this.registryDgt();
    const nodes = await registryDgt.findRecords()
    if (nodes.length > 1) {
        throw new Error("expected only one node");
    }
    return nodes[0];
}
```

**Key Implementation Notes:**
- Import DredCapo and needed types ✓
- Instantiate capo as `new DredCapo` ✓
- Use registry delegate pattern for blockchain queries ✓
- Implement `BlockServerMapper` for blockchain data → `DredHostDetails` mapping ✓

## Key Decisions Made
- Start with `server.updateDiscovery(newHosts)` test method
- Implement differential replicant management (add/remove based on diff)
- Use s01 VPS infrastructure, copy to s04 for clean implementation
- Implement `BlockServerMapper` for blockchain data mapping
- Focus on startup + method-call based polling (not continuous)
- Priority: Tests → VPS → Command-line updates → Blockchain integration 