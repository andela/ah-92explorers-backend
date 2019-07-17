import express from 'express';
import { checkToken, checkAdmin } from '../../middlewares';
import userController from '../../controllers/admin';
import validators from '../../middlewares/validations/validations';

const router = express.Router();
router.post('/admin/users', validators.validateCreateUser, checkToken, checkAdmin, userController.createUser);
router.get('/admin/users', checkToken, checkAdmin, userController.getUsers);
router.patch('/admin/users/:userId', checkToken, checkAdmin, userController.updateUser);
router.delete('/admin/users/:userId', checkToken, checkAdmin, userController.deleteUser);

export default router;
