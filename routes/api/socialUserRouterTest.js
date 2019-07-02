import { Router } from 'express';
import socialUser from '../../controllers/socialUserController';
import socialTests from '../../tests/socialUserGoogleFacebook';
import socialTestsTwitter from '../../tests/socialUserTwitter';

const socialRoute = Router();

socialRoute.post('/auth/google', socialTests, socialUser.userFacebookGoogle);
socialRoute.post('/auth/facebook', socialTests, socialUser.userFacebookGoogle);
socialRoute.post('/auth/twitter', socialTestsTwitter, socialUser.userTwitter);

export default socialRoute;
