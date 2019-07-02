import express from 'express';
import socialUserController from '../../controllers/socialUserController';

const router = express.Router();

router.get('/auth/signout', socialUserController.socialSignOut);

export default router;
