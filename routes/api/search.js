import express from 'express';
import { search } from '../../controllers';

const router = express.Router();

router.get('/articles/', search);

export default router;
