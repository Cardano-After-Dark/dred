# TODO - DRED Replication Testing Session x01

## **🚨 Critical Path Items**

### **1. Deploy Fixes to Remote Servers**
- **Priority**: URGENT
- **Status**: Ready to execute
- **Actions**:
  ```bash
  # Commit local changes
  git add -A
  git commit -m "Fix server binding and improve replication logging"
  git push origin feature/onchain-replication-m2
  
  # Deploy to US server
  cd preprod/
  make update-dred us
  ```
- **Expected Outcome**: US server binds to `0.0.0.0:3029` instead of `127.0.0.1:3029`

### **2. Test External Connectivity**
- **Priority**: HIGH
- **Status**: Blocked by #1
- **Actions**:
  ```bash
  # Test server availability
  cd preprod/
  make test us
  
  # Test with curl
  curl -X POST "http://74.208.13.84:3029/channel/news/message" \
    -H "Content-Type: application/json" \
    -H "clientid: test-curl-client" \
    -d '{"type": "test", "ocid": "test-'$(date +%s)'", "msg": "hello"}'
  ```
- **Expected Outcome**: Connection successful, message posted

### **3. Verify Message Replication**
- **Priority**: HIGH  
- **Status**: Blocked by #1, #2
- **Actions**:
  ```bash
  # Start local server with replication logging
  LOGGING=default:debug,replicant:trace,replicator:trace \
    pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
  
  # Post message to remote server (from another terminal)
  curl -X POST "https://de.pp.node-01.dred.network/channel/news/message" \
    -H "Content-Type: application/json" \
    -H "clientid: test-curl-client" \
    -d '{"type": "test", "ocid": "repl-test-'$(date +%s)'", "msg": "replication test"}'
  ```
- **Expected Outcome**: Message appears in local server logs as replicated

## **🔧 Technical Tasks**

### **4. Test Interactive Client**
- **Priority**: MEDIUM
- **Status**: Ready after #1, #2
- **Actions**:
  ```bash
  # Run interactive test client
  LOGGING=test-client:info node scripts/test-client.js
  
  # Select server (DE/US/UK)
  # Select channel (news)
  # Send test message
  ```
- **Expected Outcome**: Client connects, sends/receives messages

### **5. Validate All Three Servers**
- **Priority**: MEDIUM
- **Status**: After #1-#4 complete
- **Actions**:
  - Test DE server (HTTPS): `https://de.pp.node-01.dred.network:443`
  - Test US server (HTTP): `http://74.208.13.84:3029`  
  - Test UK server (HTTP): `http://217.154.34.155:3029`
- **Expected Outcome**: All servers accessible and functional

### **6. End-to-End Replication Test**
- **Priority**: MEDIUM
- **Status**: Final validation
- **Actions**:
  1. Start local server with full logging
  2. Verify replication connections to all remote servers
  3. Send messages to each remote server
  4. Confirm all messages replicated locally
  5. Test client receiving replicated messages
- **Expected Outcome**: Complete replication workflow functional

## **📋 Documentation Tasks**

### **7. Update Deployment Documentation**
- **Priority**: LOW
- **Status**: After successful testing
- **Actions**:
  - Document working server configurations
  - Update environment variable requirements
  - Record successful test procedures
- **Expected Outcome**: Reproducible deployment process

### **8. Create Replication Test Guide**
- **Priority**: LOW
- **Status**: After #6 complete
- **Actions**:
  - Document working curl commands
  - Create test client usage guide
  - Record logging configuration examples
- **Expected Outcome**: Easy replication testing for future development

## **⚠️ Risk Items**

### **Network/Firewall Issues**
- **Risk**: Server binding fix may not resolve connectivity
- **Mitigation**: Check UFW rules, network configuration
- **Fallback**: Direct server debugging via SSH

### **Environment Variable Issues**  
- **Risk**: Deployment scripts may not properly inject `DRED_HOST`
- **Mitigation**: Verify `.env` file creation in deployment
- **Fallback**: Manual environment variable setting

### **Replication Logic Issues**
- **Risk**: Replication may have other blocking issues
- **Mitigation**: Check Redis connectivity, peer discovery
- **Fallback**: Review replication test suite for working examples

## **✅ Success Metrics**

### **Immediate Success** (End of current session)
- [ ] US server responds to external connections
- [ ] curl commands complete without timeout
- [ ] Local server shows active replication connections

### **Complete Success** (Next session)
- [ ] Messages posted to remote servers appear in local logs
- [ ] Test client can connect to all three servers
- [ ] End-to-end replication workflow documented and working

## **📞 Next Steps**
1. **Execute Critical Path**: Items #1-#3 in sequence
2. **Validate Results**: Confirm connectivity and basic replication
3. **Document Issues**: Any remaining problems for next session
4. **Plan Next Session**: Advanced testing and production readiness
