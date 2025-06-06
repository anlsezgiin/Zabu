import express from 'express';
import { handleTweetAnalysis } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/', handleTweetAnalysis);

export default router;
