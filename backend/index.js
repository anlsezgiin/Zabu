import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import linkRoutes from './src/routes/link.js';
import analysisRoute from './src/routes/analysisRoute.js';

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

// Routes
app.use('/postLink', linkRoutes);
app.use('/analysis', analysisRoute);

// Test
app.get('/ping', (req, res) => {
  res.send('Zabu server is alive! 🐾');
});


app.listen(PORT, () => {
  console.log(`🚀 Zabu backend running at http://localhost:${PORT}`);
});
