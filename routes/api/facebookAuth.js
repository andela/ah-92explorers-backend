import express from 'express';
import passport from '../../middlewares/passport';
import socialUserController from '../../controllers/socialUserController';

const router = express.Router();

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/callback', passport.authenticate('facebook'), socialUserController.userFacebookGoogle);

export default router;
