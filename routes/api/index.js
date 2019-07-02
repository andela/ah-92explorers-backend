import express from 'express';
import admin from './admin';
import users from './users';
import socialTest from './socialTest';

const router = express.Router();

router.use('/', admin);
router.use('/', users);
router.use('/', socialTest);

export default router;
