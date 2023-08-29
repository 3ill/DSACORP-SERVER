import express from 'express';
import {
  getAllSubscribers,
  subscriber,
  getAllUsers,
  addUser,
} from '../controllers/Controller.js';

const router = express.Router();
//? All routes are defined here
router.get('/getAllSubscribers', getAllSubscribers);
router.get('/allUsers', getAllUsers);

router.post('/subscribe', subscriber);
router.post('/newUser', addUser);

export default router;
