import express from 'express';
import admin from './admin';
import users from './users';
import articles from './articles';

const router = express.Router();

router.use('/', admin);
router.use('/', users);
router.use('/', articles);

export default router;
