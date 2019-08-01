/* eslint-disable import/no-named-as-default */

import express from 'express';
import passport from '../../middlewares/passport';
import {
  signup, signin, verifyUser, signoutUser,
} from '../../controllers';
import Validations from '../../middlewares/validations/authValidations';
import Profile from '../../controllers/profile';
import uploadImage from '../../middlewares/imageUpload';
import Follower from '../../controllers/followers';
import { checkToken } from '../../middlewares';
import socialAuth from '../../controllers/socialAuth';
import resetPasswordController from '../../controllers/resetPassword';
import articleStats from '../../controllers/readingStat';
import {
  subscribe,
  allNotifications,
  singleNotification,
  deleteNotification
} from '../../controllers/notifications';

// const follower = new Follower();

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
*             example: abel12345
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
*             example: Alpha123$
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
*             example: abtexi@gmail.com
*           password:
*             type: string
*             format: password
*             example: Alpha123$
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
// facebook router
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), socialAuth.userFacebookGoogle);
// google router
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', passport.authenticate('google'), socialAuth.userFacebookGoogle);
// twitter router
router.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email', 'profile'] }));
router.get('/auth/twitter/callback', passport.authenticate('twitter'), socialAuth.userTwitter);
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
/**
* @swagger
* /api/list-users:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       - Profile
*     name: List users
*     summary: User should be able to see the the list and profiles of existing authors.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: successfully listed users functionality
*       401:
*         description: unauthorised to use this resource, please signup/login
*/
router.get('/list-users', checkToken, Profile.listUsers);

/**
* @swagger
* /api/profiles/:username:
*   get:
*      tags:
*      - users
*      name: Signin
*      summary: "Users with profiles"
*      description: "Returns all users and their corresponding profiles"
*      operationId: "getUsers"
*      produces:
*      - "application/json"
*      parameters: []
*      responses:
*        200:
*          description: "User profile retrieved!"
*          schema:
*            $ref: "#/definitions/ApiResponse"
*        404:
*          description: "User does not exists!"
*/
router.get('/profiles/:username', checkToken, Profile.getProfile);

/**
* @swagger
* /api/profiles/:username:
*   put:
*     tags:
*     - "profiles"
*     summary: "Update User Profile"
*     description: "Returns the Updated User Details"
*     operationId: "updateProfile"
*     produces:
*     - "application/json"
*     parameters:
*     - in: "formData"
*       name: firstname
*       required: false
*       type: string
*       description: "first name"
*     - in: "formData"
*       name: lastname
*       required: false
*       type: string
*       description: "last name"
*     - in: "formData"
*       name: bio
*       required: false
*       type: text
*       description: "bio"
*     - in: "formData"
*       name: image
*       required: false
*       type: string
*       description: "Image URL"
*     - in: "formData"
*       name: location
*       required: false
*       type: string
*       description: "Location"
*     - in: "formData"
*       name: facebook
*       required: false
*       type: string
*       description: "Facebook URL"
*     - in: "formData"
*       name: twitter
*       required: false
*       type: string
*       description: "Twitter URL"
*     - in: "formData"
*       name: linkedIn
*       required: false
*       type: string
*       description: "linkedIn URL"
*     - in: "formData"
*       name: instagram
*       required: false
*       type: string
*       description: "Instagram URL"
*     - in: "formData"
*       name: phone
*       required: false
*       type: integer
*       description: 'Phone Number'
*       minLength: 11
*       maxLength: 14
*     responses:
*       200:
*         description: "User profile updated!"
*         schema:
*           $ref: "#/definitions/ApiResponse"
*       400:
*         description: "Invalid token supplied: format Bearer <token>"
*       401:
*         description: "Invalid Token Provided"
*       404:
*         description: "User does not exists!"
*/
router.patch('/profiles', checkToken, uploadImage, Validations.validateProfile, Profile.updateProfile);
router.post('/:username/follow', checkToken, Follower.follow);
router.get('/followers', checkToken, Follower.followers);
router.get('/following', checkToken, Follower.following);

router.get('/users/reading-stats', checkToken, articleStats.getUserReadingStats);


router.patch('/notifications/subscribe', checkToken, subscribe);
router.get('/notifications', checkToken, allNotifications);
router.get('/notifications/:id', checkToken, singleNotification);
router.delete('/notifications/:id', checkToken, deleteNotification);
export default router;
