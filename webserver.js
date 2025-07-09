/*
 * SIP Server Implementation using drachtio-srf
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install
 * 2. Install and start Drachtio server locally:
 *    - Download from: https://github.com/davehorton/drachtio-server
 *    - Or use Docker: docker run -d --name drachtio -p 9022:9022 drachtio/drachtio-server
 * 3. Start this SIP server: npm start
 * 
 * This server handles:
 * - SIP REGISTER requests (logs and responds with 200 OK)
 * - SIP INVITE requests (logs and responds with 486 Busy Here)
 */

const Srf = require('drachtio-srf');
const srf = new Srf();

// Connection configuration for local Drachtio server
const drachtioConfig = {
  host: '127.0.0.1',
  port: 9022,
  secret: 'cymru'  // default secret for drachtio-server
};

// Connect to Drachtio server
srf.connect(drachtioConfig);

// Handle SIP REGISTER requests
srf.register((req, res) => {
  const from = req.get('From');
  const contact = req.get('Contact');
  const userAgent = req.get('User-Agent');
  
  console.log('SIP REGISTER received:');
  console.log(`  From: ${from}`);
  console.log(`  Contact: ${contact}`);
  console.log(`  User-Agent: ${userAgent || 'Unknown'}`);
  
  // Respond with 200 OK for all registration attempts
  res.send(200, 'OK', {
    'Contact': contact,
    'Expires': '3600'
  });
  
  console.log('  Response: 200 OK (Registration accepted)');
});

// Handle SIP INVITE requests
srf.invite((req, res) => {
  const from = req.get('From');
  const to = req.get('To');
  const callId = req.get('Call-ID');
  const userAgent = req.get('User-Agent');
  
  console.log('SIP INVITE received:');
  console.log(`  From: ${from}`);
  console.log(`  To: ${to}`);
  console.log(`  Call-ID: ${callId}`);
  console.log(`  User-Agent: ${userAgent || 'Unknown'}`);
  
  // Respond with 486 Busy Here for all incoming calls
  res.send(486, 'Busy Here');
  
  console.log('  Response: 486 Busy Here (Call rejected)');
});

// Handle connection errors
srf.on('error', (err) => {
  console.error('SIP server error:', err.message);
});

// Handle connection events
srf.on('connect', (err, hostport) => {
  if (err) {
    console.error('Connection error:', err.message);
    console.error('Make sure Drachtio server is running on localhost:9022');
    process.exit(1);
    return;
  }
  console.log(`Connected to Drachtio server at ${hostport}`);
  console.log('SIP server is ready to handle requests');
});

srf.on('disconnect', () => {
  console.log('Disconnected from Drachtio server');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down SIP server...');
  try {
    srf.disconnect();
  } catch (err) {
    // Ignore disconnect errors when not connected
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down SIP server...');
  try {
    srf.disconnect();
  } catch (err) {
    // Ignore disconnect errors when not connected
  }
  process.exit(0);
});
