import express from 'express';
import resetPasswordController from '../../controllers/resetPasswordController';

const router = express.Router();

router.post('/password', resetPasswordController.sendResetLinkEmail);
router.put('/password', resetPasswordController.resetPassword);

export default router;
