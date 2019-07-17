import express from 'express';
import admin from './admin';
import users from './users';
import socialTest from './socialTest';
import articles from './articles';
import search from './search';
import ratings from './ratings';
import likes from './likes';

const router = express.Router();

router.use('/', admin);
router.use('/', users);
router.use('/', socialTest);
router.use('/', articles);
router.use('/', search);
router.use('/', ratings);
router.use('/', likes);

export default router;
