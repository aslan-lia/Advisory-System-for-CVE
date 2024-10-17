import dotenv from 'dotenv';
dotenv.config(); //Loading environment variables from .env file


import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express.js with TypeScript!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 404 Error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});
