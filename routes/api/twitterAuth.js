import express from 'express';
import passport from '../../middlewares/passport';
import socialUserController from '../../controllers/socialUserController';

const router = express.Router();

router.get('/', passport.authenticate('twitter', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('twitter'), socialUserController.userTwitter);

export default router;
