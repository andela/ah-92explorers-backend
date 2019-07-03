import Mailer from './mailer';

const sendEmail = (userEmail, token, template) => async (resolve, reject) => {
  try {
    const mailer = await new Mailer(userEmail);
    const response = mailer.addTokenToEmail(token, template);
    resolve(response);
  } catch (error) {
    reject(new Error(`Email failed: ${error.message}`));
  }
};

export default sendEmail;
