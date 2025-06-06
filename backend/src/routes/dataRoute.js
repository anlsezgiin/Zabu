import express from 'express';
import { handleGetData } from '../controllers/dataController.js';

const router = express.Router();

router.get('/', handleGetData);

export default router;
