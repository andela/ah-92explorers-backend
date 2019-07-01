import express from 'express';
import welcomeController from '../../controllers/welcomeController';
import { checkToken } from '../../middlewares/authToken';

const router = express.Router();
router.get('/welcome', checkToken, welcomeController.welcome);
router.get('/gentoken', welcomeController.gentoken);

export default router;
