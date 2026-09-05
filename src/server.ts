import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './db.js';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getFacetedUsers
} from './controllers/userController.js';
import {
  runAggregationSandbox,
  getSamplePipelines
} from './controllers/aggregationController.js';
import { analyzeIndexFitness } from './controllers/indexAnalyzerController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health & Status
app.get('/api/health', (_req: Request, res: Response) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    service: 'learn-mongodb-api',
    version: '2.0.0',
    mode: isMongoConnected ? 'mongodb-live' : 'mock-engine-fallback',
    timestamp: new Date().toISOString()
  });
});

// Users REST API
app.get('/api/users', getUsers);
app.get('/api/users/faceted', getFacetedUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUserById);
app.delete('/api/users/:id', deleteUserById);

// Aggregation Sandbox
app.post('/api/aggregate', runAggregationSandbox);
app.get('/api/sample-pipelines', getSamplePipelines);

// Index Analyzer (ESR Rule)
app.post('/api/index-analyzer', analyzeIndexFitness);

// Fallback HTML route
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Launch server if not running in test mode
if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(status => {
      if (status.isLive) {
        console.log(`Connected to MongoDB Atlas: ${status.uri}`);
      } else {
        console.log('Running with high-performance In-Memory mock database fallback.');
      }
      app.listen(PORT, () => {
        console.log(`MongoDB Curriculum Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error('Database connection error:', err);
      app.listen(PORT, () => {
        console.log(`Server started in fallback mode on port ${PORT}`);
      });
    });
}
