import express from 'express';
import {
  signup, signin, verifyUser, signoutUser,
} from '../../controllers';
import Validations from '../../middlewares/validations/validations';
import { checkToken } from '../../middlewares';
import resetPasswordController from '../../controllers/resetPasswordController';

const router = express.Router();
/**
* @swagger
* /api/users:
*   post:
*     tags:
*       - Auth
*     name: Signup
*     summary: Signs up in a User/Admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           username:
*             type: string
*             example: abel
*           firstName:
*             type: string
*             example: jojo
*           lastName:
*             type: string
*             example: abtex
*           email:
*             type: string
*             example: abtexi@gmail.com
*           password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - username
*           - firstName
*           - lastName
*           - email
*           - password
*     responses:
*       201:
*         description: User creeated
*/
router.post('/users', Validations.validateCreateUser, signup);

/**
* @swagger
* /api/users/login:
*   post:
*     tags:
*       - Auth
*     name: Signin
*     summary: Signs in in a User/Admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           email:
*             type: string
*             example: abtex@gmail.com
*           password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: User Has Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/
router.post('/users/login', Validations.validateSiginUser, signin);
router.get('/users/verify/:token', verifyUser);
router.post('/users/signout', checkToken, signoutUser);
/**
* @swagger
* /api/password:
*   post:
*     tags:
*       - Auth
*     name: Reset Password Link
*     summary: Send a reset password email
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           email:
*             type: string
*             example: abtex@gmail.com
*         required:
*           - email
*     responses:
*       200:
*         description: We have e-mailed a password reset link, Check your email!
*       404:
*         description: The email provided does not exist
*/
router.post('/password', resetPasswordController.sendResetLinkEmail);
router.get('/reset-password/:token', resetPasswordController.getToken);
/**
* @swagger
* /api/password:
*   put:
*     tags:
*       - Auth
*     name: Reset Password
*     summary: Reset password after receiving a token
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           token:
*             type: string
*             example: ynuifsrdqwsdkensns
*           password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - token
*           - password
*     responses:
*       200:
*         description: Your password was reset successfully
*       401:
*         description: Invalid token
*/
router.put('/password', Validations.validatePasswordOnReset, resetPasswordController.resetPassword);

// Reset Password
router.post('/password', resetPasswordController.sendResetLinkEmail);
router.get('/reset-password/:token', resetPasswordController.getToken);
router.put('/password', Validations.validatePasswordOnReset, resetPasswordController.resetPassword);


export default router;
