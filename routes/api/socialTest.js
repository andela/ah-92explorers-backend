import { Router } from 'express';
import socialUser from '../../controllers/socialAuth';
import { twitterUser, googleFacebookUser } from '../../tests/index.test';

const socialRoute = Router();

socialRoute.post('/auth/google', googleFacebookUser, socialUser.userFacebookGoogle);
socialRoute.post('/auth/facebook', googleFacebookUser, socialUser.userFacebookGoogle);
socialRoute.post('/auth/twitter', twitterUser, socialUser.userTwitter);

export default socialRoute;
