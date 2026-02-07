import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3092;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'chat', timestamp: new Date().toISOString() });
});

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'matthesketh.pro chat server',
    version: '1.0.0',
    socketio: 'enabled',
    connections: io.engine.clientsCount
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] Client connected: ${socket.id}`);

  // Send welcome message
  socket.emit('welcome', {
    message: 'Connected to matthesketh.pro chat server',
    id: socket.id,
    timestamp: new Date().toISOString()
  });

  // Handle chat messages
  socket.on('message', (data) => {
    console.log(`[${new Date().toISOString()}] Message from ${socket.id}:`, data);

    // Broadcast message to all clients except sender
    socket.broadcast.emit('message', {
      ...data,
      from: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      userId: socket.id,
      ...data
    });
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}, reason: ${reason}`);
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Socket error for ${socket.id}:`, error);
  });
});

// Start server
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Chat server running on port ${PORT}`);
  console.log(`CORS origin: ${CORS_ORIGIN}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
