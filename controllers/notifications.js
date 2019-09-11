import dotenv from 'dotenv';
import models from '../models';
import { favoritedArticle, followers } from '../helpers/favoritedAndFollowed';
import Templates from '../helpers/emailTemplates';
import Mailer from '../helpers/mailer';

dotenv.config();
const { notificationTemplate } = Templates;

const { notifications, users } = models;

const mailOptions = {
  to: '',
  from: process.env.SENDER_EMAIL,
  subject: 'Notification',
  html: ''
};


export const notificationForFavorite = async (articleId, message, notifier, slug) => {
  try {
    let allNotifications = [];
    const favoritees = await favoritedArticle(articleId, slug);
    if (favoritees[0].length > 0) {
      favoritees[0].map((user) => {
        const { id, notificationsOpt } = user.liker;
        if (id !== notifier && notificationsOpt === true) {
          const singleNotification = { userId: id, message };
          allNotifications.push(singleNotification);
        }
      });
      if (allNotifications.length > 0) {
        allNotifications = Object
          .values(allNotifications
            .reduce((acc, cur) => Object.assign(acc, { [cur.userId]: cur }), {}));
        const createdNotifications = await notifications.bulkCreate(allNotifications, {
          returning: true
        });
        return createdNotifications;
      }
    }
  } catch (error) {
    return error;
  }
};

export const notificationForFollower = async (userId, message, author) => {
  try {
    const allNotifications = [];
    const singleNotification = { userId: '', message: '', author };
    const allFollowers = await followers(userId);
    if (allFollowers.length > 0) {
      allFollowers.map((follower) => {
        const { id, notificationsOpt } = follower.follower;
        if (notificationsOpt === true) {
          singleNotification.userId = id;
          singleNotification.message = message;
          allNotifications.push(singleNotification);
        }
      });
      const createdNotifications = await notifications.bulkCreate(allNotifications, {
        returning: true
      });
      return createdNotifications;
    }
  } catch (error) {
    return error;
  }
};

export const notifyFavoritees = async (articleId, message, notifier, slug) => {
  const emails = new Set();
  const favoritees = await favoritedArticle(articleId, slug);
  if (favoritees[0].length > 0 && favoritees[1].length > 0) {
    favoritees[0].map((user) => {
      const { id, email, notificationsOpt } = user.liker;
      if (notificationsOpt === true && id !== notifier) {
        emails.add(email);
      }
    });
    if (emails.size > 0) {
      mailOptions.to = [...emails];
      mailOptions.html = notificationTemplate(message);
      const mailer = new Mailer();
      mailer.sendEmail(mailOptions);
    }
  }
};

export const sendNotificationToFollower = async (userId, message) => {
  try {
    const emails = new Set();
    const allFollowers = await followers(userId);
    if (allFollowers.length > 0) {
      allFollowers.forEach((user) => {
        const { email, notificationsOpt } = user.follower;
        if (notificationsOpt === true) {
          emails.add(email);
        }
      });

      if (emails.size > 0) {
        mailOptions.to = [...emails];
        mailOptions.html = notificationTemplate(message);
        const mailer = new Mailer();
        mailer.sendEmail(mailOptions);
      }
    }
  } catch (error) {
    return error;
  }
};

export const allNotifications = async (req, res) => {
  try {
    const allNotification = await notifications.findAll({
      where: { userId: req.decoded.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ allNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const singleNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleNotification = await notifications.findOne({
      where: { id, status: 'unread' }
    });
    if (!getSingleNotification) {
      return res.status(404).json({ error: 'notification not found' });
    }
    const updatedNotification = await notifications.update(
      { status: 'read' },
      { where: { id: getSingleNotification.id }, returning: true }
    );
    return res.status(200).json({ notification: updatedNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleNotification = await notifications.destroy({
      where: { id },
      returning: true
    });
    if (getSingleNotification) {
      return res.status(204).json({ message: 'notification successfully deleted.' });
    }
    return res.status(404).json({ error: 'notification not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const subscribe = async (req, res) => {
  const { id } = req.decoded;
  const user = await users.findOne({ where: { id } });
  let allow;
  if (user.notificationsOpt === true) {
    allow = false;
  } else {
    allow = true;
  }
  const updatedUser = await users.update(
    { notificationsOpt: allow },
    { where: { id }, returning: true, plain: true }
  );
  res.status(200).json({
    user: updatedUser[1].notificationsOpt ? 'successfully subscribed to email notifications'
      : 'successfully unsubscribed to email notifications',
    opted: allow,
  });
};
