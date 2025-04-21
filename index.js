import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userWanderNest.js';  // User routes
import tourRoutes from './routes/wanderNestRoute.js';  // Tour routes

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB:', err.message));

// API Base URL will be /api
app.use('/api/users', userRoutes);  // User-related routes like register, login
app.use('/api/tours', tourRoutes);  // Tour-related routes like creating, viewing tours

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

