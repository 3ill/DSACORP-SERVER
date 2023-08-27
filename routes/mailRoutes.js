import express from 'express';
import {
  getAllSubscribers,
  subscriber,
} from '../controllers/mailController.js';

const router = express.Router();
//? All routes are defined here
router.get('/', getAllSubscribers);
router.post('/subscribe', subscriber);

export default router;
