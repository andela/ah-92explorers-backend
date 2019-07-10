import express from 'express';
import admin from './admin';
import users from './users';

const router = express.Router();

router.use('/', admin);
router.use('/', users);

export default router;
