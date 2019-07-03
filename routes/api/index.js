import express from 'express';
import welcome from './welcome';
import users from './users';

const router = express.Router();

router.use('/', welcome);
router.use('/', users);

export default router;
