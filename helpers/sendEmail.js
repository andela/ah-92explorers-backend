import Mailer from './mailer';

const sendEmail = async (userEmail, token, template) => {
  try {
    const mailer = new Mailer(userEmail);
    await mailer.addTokenToEmail(token, template);
  } catch (error) {
    return `Email failed: ${error.message}`;
  }
};

export default sendEmail;
