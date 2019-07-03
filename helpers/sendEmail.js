import Mailer from './mailer';

/**
 * Call mailer class to send email to the user
 * @param {string} userEmail - User email account for sending email to
 * @param {string} token - Token that added to email sent
 * @param {template} template email templates
 * @returns {object} response.
 */
const sendEmail = async (userEmail, token, template) => {
  try {
    const mailer = new Mailer(userEmail);
    await mailer.addTokenToEmail(token, template);
  } catch (error) {
    return `Email failed: ${error.message}`;
  }
};

export default sendEmail;
