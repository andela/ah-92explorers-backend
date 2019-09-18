import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';
import client from '../helpers/redis';
import Auth from '../helpers/auth';

const { users, sequelize } = db;

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { APP_URL_BACKEND, FRONT_END_URL } = process.env;

export const signup = async (req, res) => {
  const {
    username, firstname, lastname, email, password
  } = req.body;
  const hashedPassword = Auth.hashPassword(password);
  const transaction = await sequelize.transaction({ autocommit: false });
  try {
    const newUser = await users.create(
      {
        username,
        firstName: firstname,
        lastName: lastname,
        email,
        password: hashedPassword
      },
      {
        transaction
      }
    );
    await transaction.commit();
    if (newUser) {
      const token = Auth.genToken(username, email, newUser.id);
      const msg = {
        to: email,
        from: 'authorshaven92@gmail.com',
        subject: 'Account Verification',
        html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #444;">Authors Haven</h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome ${username},<br> We are happy to have you onboard. Please verify your mail to enjoy premium access.<br> Click the blue button below to verify your account.</p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${APP_URL_BACKEND}/api/users/verify/${token}">Verify Account</a>
          </a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Authors Haven</p>
          </div>`
      };
      sgMail.send(msg);
      return res.status(201).json({
        message: 'created successfully',
        user: {
          token: Auth.genToken(username, email, newUser.id),
          username: newUser.username,
          email: newUser.email
        }
      });
    }
  } catch (ex) {
    await transaction.rollback();
    return res.status(409).json({ error: `${ex.errors[0].path.toLowerCase()} already exists` });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const user = await users.findOne({ where: { email: req.body.email } }, { transaction });
    const verifiedUser = await users.findOne(
      { where: { email: req.body.email, isVerified: true } },
      { transaction }
    );
    await transaction.commit();

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    if (!verifiedUser) {
      return res.status(404).json({ error: 'please verify your account ' });
    }
    const passBool = Auth.comparePassword(password, verifiedUser.password);
    const { username } = verifiedUser;
    if (passBool) {
      return res.status(200).json({
        message: 'logged in',
        user: {
          id: verifiedUser.id,
          token: Auth.genToken(username, email, verifiedUser.id),
          username,
          email: verifiedUser.email,
          image: verifiedUser.image
        }
      });
    }
    return res.status(401).json({ error: 'wrong username or password' });
  } catch (ex) {
    await transaction.rollback();
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.params;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  try {
    const user = await users.findOne({ where: { id: decodedToken.id }});
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'user not registered'
      });
    }
    const updatedUser = await users.update(
      { isVerified: true },
      { where: { email: decodedToken.email } }
    );
    if (updatedUser) {
      return res.redirect(`${FRONT_END_URL}/login`);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'something went wrong'
    });
  }
};

export const signoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await client.set(token, 'Blacklisted'); // Blacklist the token and store it in redis
    return res.status(200).json({
      message: 'successfully signed out'
    });
  } catch (error) {
    res.status(500).json({
      error: 'failed to signout'
    });
  }
};
