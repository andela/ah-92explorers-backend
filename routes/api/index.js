import express from 'express';
import admin from './admin';
import facebookAuth from './facebookAuth';
import googleAuth from './googleAuth';
import twitterAuth from './twitterAuth';
import socialLoginTest from './socialUserRouterTest';
import userSignOut from './signOut';

const router = express.Router();

router.use('/', admin);

router.use('/auth/facebook', facebookAuth);
router.use('/auth/google', googleAuth);
router.use('/auth/twitter', twitterAuth);
router.use('/', socialLoginTest);
router.use('/', userSignOut);

export default router;
