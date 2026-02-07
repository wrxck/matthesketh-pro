# matthesketh.pro Docker Deployment

## Overview

This project has been successfully migrated to Docker with two services:

1. **BlueSky HTTP Server** - Main website (SvelteKit)
2. **Chat Subdomain** - Socket.IO chat server

## Services

### 1. matthesketh-pro (Port 60610)
- **Container**: `matthesketh-pro`
- **Port**: `127.0.0.1:60610:60610`
- **Technology**: SvelteKit, Node.js 20
- **URL**: http://localhost:60610
- **Health Check**: `curl http://localhost:60610/`

### 2. chat (Port 3092)
- **Container**: `matthesketh-pro-chat`
- **Port**: `127.0.0.1:3092:3092`
- **Technology**: Express + Socket.IO
- **URL**: http://localhost:3092
- **Health Check**: `curl http://localhost:3092/health`
- **Socket.IO**: WebSocket and polling enabled

## Quick Start

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker logs matthesketh-pro
docker logs matthesketh-pro-chat

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d

# Check status
docker-compose ps
```

## Testing

### Test BlueSky HTTP Server
```bash
curl http://localhost:60610/
```

### Test Chat Service
```bash
# Health check
curl http://localhost:3092/health

# Service info
curl http://localhost:3092/

# Interactive test (open in browser)
open chat/test-client.html
```

## Socket.IO Events

### Client → Server
- `message` - Send a chat message
- `typing` - Notify server of typing status

### Server → Client
- `welcome` - Connection established
- `message` - Receive chat message from other users
- `typing` - User typing notification

## Resource Limits

Both services are configured with:
- **CPU**: 0.25 cores (25%)
- **Memory**: 128MB

Current usage:
- matthesketh-pro: ~18MB
- matthesketh-pro-chat: ~13MB

## Security Features

- Non-root user (appuser:1001)
- No new privileges
- All capabilities dropped
- Read-only where possible
- Health checks enabled
- Graceful shutdown handling

## Network Configuration

- **Network**: `mattheskethpro_default` (bridge)
- **matthesketh-pro**: 172.29.0.2/16
- **matthesketh-pro-chat**: 172.29.0.3/16
- **Ports bound to**: 127.0.0.1 (localhost only)

## Production Deployment

For production use with domain names:

1. Update CORS settings in docker-compose.yml:
   ```yaml
   environment:
     - ORIGIN=https://matthesketh.pro
     - CORS_ORIGIN=https://chat.matthesketh.pro
   ```

2. Configure reverse proxy (nginx/caddy) to:
   - Proxy `matthesketh.pro` → `localhost:60610`
   - Proxy `chat.matthesketh.pro` → `localhost:3092`
   - Enable WebSocket support for Socket.IO

3. Update health check endpoints in your reverse proxy

## Files Created

```
matthesketh.pro/
├── docker-compose.yml          # Multi-service orchestration
├── Dockerfile                  # Main website image
├── .dockerignore              # Build context exclusions
└── chat/
    ├── Dockerfile             # Chat service image
    ├── .dockerignore          # Chat build exclusions
    ├── package.json           # Chat dependencies
    ├── server.js              # Socket.IO server
    └── test-client.html       # Socket.IO test client
```

## Monitoring

```bash
# View resource usage
docker stats matthesketh-pro matthesketh-pro-chat

# Check health status
docker inspect matthesketh-pro --format='{{.State.Health.Status}}'
docker inspect matthesketh-pro-chat --format='{{.State.Health.Status}}'

# View logs with timestamps
docker logs matthesketh-pro --timestamps
docker logs matthesketh-pro-chat --timestamps
```

## Troubleshooting

### Service won't start
```bash
docker-compose logs [service-name]
docker inspect [container-name]
```

### Port already in use
```bash
# Check what's using the port
ss -tlnp | grep -E '(60610|3092)'

# Stop conflicting service or change port in docker-compose.yml
```

### Health check failing
```bash
# Test health endpoint manually
docker exec matthesketh-pro curl -f http://localhost:60610/
docker exec matthesketh-pro-chat curl -f http://localhost:3092/health
```

### Rebuild from scratch
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Status: ✅ DEPLOYED

- Both services built successfully
- Containers running and healthy
- Ports accessible on localhost
- Health checks passing
- Resource usage within limits
- Socket.IO functionality verified
