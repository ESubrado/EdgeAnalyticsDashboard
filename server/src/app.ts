import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import userRoutes from './routes/analytics.routes';
import { AnalyticsBase } from './models/analytics';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/analytics', userRoutes);

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",     
  }
});

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
});

db.once('open', () => {
  console.log('MongoDB IO Stream connected');

  // Setup change stream
  const changeStream = AnalyticsBase.watch();

  changeStream.on('change', (change) => {
    console.log('Change detected:', change);

    // Emit the change to all connected clients
    io.emit('mongoChange', change.fullDocument);
  });
});
 

export default server;