import express from 'express';
import welcomeController from '../../controllers/welcomeController';

const router = express.Router();
router.get('/welcome', welcomeController.welcome);

export default router;
