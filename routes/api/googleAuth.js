import express from 'express';
import passport from '../../middlewares/passport';
import socialUserController from '../../controllers/socialUserController';

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google'), socialUserController.userFacebookGoogle);

export default router;
