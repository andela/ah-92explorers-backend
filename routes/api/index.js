import express from 'express';
import welcome from './welcome';

const router = express.Router();

router.use('/', welcome);

export default router;
