import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import aboutDeveloperRoutes from './routes/aboutDeveloper.routes';
import userRoutes from './routes/analytics.routes';
import { AnalyticsBase } from './models/analytics';
import { AboutDeveloperBase } from './models/aboutDeveloper';
import { aboutDeveloperSeedData } from './seed/aboutDeveloperData';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/analytics', userRoutes);
app.use('/api/about-developer', aboutDeveloperRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

db.once('open', async () => {
  console.log('MongoDB IO Stream connected');

  // Auto-seed developer profile if it doesn't exist
  try {
    const existing = await AboutDeveloperBase.findOne({ slug: 'main' });
    if (!existing) {
      await AboutDeveloperBase.create(aboutDeveloperSeedData);
      console.log('Developer profile seeded successfully');
    } else {
      console.log('Developer profile already exists');
    }
  } catch (err) {
    console.error('Error seeding developer profile:', err);
  }

  // Real-time change stream for analytics
  const changeStream = AnalyticsBase.watch();
  changeStream.on('change', (change) => {
    console.log('Change detected:', change);
    io.emit('mongoChange', change.fullDocument);
  });
});

export default server;
