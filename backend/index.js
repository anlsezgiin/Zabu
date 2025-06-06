import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import linkRoutes from './src/routes/link.js';
import analysisRoute from './src/routes/analysisRoute.js';
import dataRoute from './src/routes/dataRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'zabu-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(cors({
  origin: 'http://localhost:5173', // frontend’in çalıştığı port!
  credentials: true
}));

// Routes
app.use('/postLink', linkRoutes);
app.use('/analysis', analysisRoute);
app.use('/getData', dataRoute);

app.listen(PORT, () => {
  console.log(`🚀 Zabu backend running at http://localhost:${PORT}`);
});
