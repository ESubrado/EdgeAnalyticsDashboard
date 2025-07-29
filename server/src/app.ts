import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/analytics.routes';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/analytics', userRoutes);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;