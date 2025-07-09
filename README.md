# SIP Server (Telebora Node.js)

A minimal SIP server implementation using drachtio-srf for Node.js. This server handles basic SIP operations including REGISTER and INVITE requests.

## Features

- **SIP REGISTER handling**: Logs registration attempts and responds with 200 OK
- **SIP INVITE handling**: Logs incoming calls and responds with 486 'Busy Here'
- **Connection and error logging**: Comprehensive logging for troubleshooting
- **Graceful shutdown**: Proper cleanup on SIGINT/SIGTERM signals

## Requirements

- Node.js (version 12 or higher)
- Drachtio server running locally

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install and start Drachtio server**:
   
   **Option A - Using Docker (recommended)**:
   ```bash
   docker run -d --name drachtio -p 9022:9022 drachtio/drachtio-server
   ```
   
   **Option B - Manual installation**:
   - Download from: https://github.com/davehorton/drachtio-server
   - Follow the installation instructions for your platform
   - Start with default configuration (listening on port 9022)

3. **Start the SIP server**:
   ```bash
   npm start
   ```

## Usage

Once running, the server will:
- Connect to the local Drachtio server at `127.0.0.1:9022`
- Log all SIP REGISTER and INVITE requests
- Respond appropriately to each request type

## Configuration

The server uses the following default configuration:
- **Drachtio host**: 127.0.0.1
- **Drachtio port**: 9022
- **Secret**: cymru (default drachtio-server secret)

To modify these settings, edit the `drachtioConfig` object in `webserver.js`.

## Logging

The server provides detailed logging for:
- Connection status to Drachtio server
- Incoming SIP REGISTER requests (From, Contact, User-Agent)
- Incoming SIP INVITE requests (From, To, Call-ID, User-Agent)
- Response codes sent back to clients
- Error conditions and disconnections
