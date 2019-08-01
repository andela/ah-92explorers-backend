import dotenv from 'dotenv';

dotenv.config();
const clientUrl = (process.env.NODE_ENV === 'production') ? 'https://ah-92explorers-api.herokuapp.com' : 'http://127.0.0.1:3000';

/**
 * An object module that holds mails' templates
 * @exports email/templates
 */
const emailTemplates = {
  resetPassword: {
    from: '',
    to: '',
    subject: 'Password reset',
    html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
    <h1 style="color: #444;">Authors Haven</h1>
    <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">You are receiving this email because we received a password reset request for your account. Click the blue button below to reset the password. If you did not request a password reset, no further action is required.</p>
    <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${clientUrl}/api/reset-password/$token">Reset Password</a>
    </a></p>
    <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
    <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Authors Haven</p>
    </div>`
  },
};

const notificationTemplate = message => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 500;
          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 500;
          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 700;
          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 700;
          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 800;
          src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 800;
          src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
      }
  
      #outlook a {
        padding: 0;
      }
  
      .ReadMsgBody,
      .ExternalClass {
        width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass td,
      .ExternalClass div,
      .ExternalClass span,
      .ExternalClass font {
        line-height: 100%;
      }
  
      div[style*="margin: 14px 0"],
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }
  
      table,
      td {
        mso-table-lspace: 0;
        mso-table-rspace: 0;
      }
  
      table,
      tr,
      td {
        border-collapse: collapse;
      }
  
      body,
      td,
      th,
      p,
      div,
      li,
      a,
      span {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        mso-line-height-rule: exactly;
      }
      footer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        border: 0;
        outline: none;
        line-height: 100%;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
  
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
      }
  
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        -webkit-font-smoothing: antialiased;
      }
  
      .pc-gmail-fix {
        display: none;
        display: none !important;
      }
  
      @media screen and (min-width: 621px) {
        .pc-email-container {
          width: 620px !important;
        }
      }
  
      @media screen and (max-width:620px) {
        .pc-sm-p-30 {
          padding: 30px !important
        }
        .pc-sm-p-30-25 {
          padding: 30px 25px !important
        }
        .pc-sm-p-25 {
          padding: 25px !important
        }
        .pc-sm-mw-100pc {
          max-width: 100% !important
        }
        .pc-sm-m-0-auto {
          margin: 0 auto !important
        }
        .pc-sm-ta-center {
          text-align: center !important
        }
        .pc-sm-p-35-10-15 {
          padding: 35px 10px 15px !important
        }
        .pc-sm-mw-50pc {
          max-width: 50% !important
        }
        .pc-sm-p-21-10-14 {
          padding: 21px 10px 14px !important
        }
        .pc-sm-h-20 {
          height: 20px !important
        }
        .pc-sm-p-24-20-30 {
          padding: 24px 20px 30px !important
        }
      }
  
      @media screen and (max-width:525px) {
        .pc-xs-p-20 {
          padding: 20px !important
        }
        .pc-xs-p-20-15 {
          padding: 20px 15px !important
        }
        .pc-xs-p-15 {
          padding: 15px !important
        }
        .pc-xs-p-25-0-5 {
          padding: 25px 0 5px !important
        }
        .pc-xs-mw-100pc {
          max-width: 100% !important
        }
        .pc-xs-br-disabled br {
          display: none !important
        }
        .pc-xs-p-5-0 {
          padding: 5px 0 !important
        }
        .pc-xs-p-15-10-20 {
          padding: 15px 10px 20px !important
        }
        .pc-xs-h-100 {
          height: 100px !important
        }
        .pc-xs-fs-30 {
          font-size: 30px !important
        }
        .pc-xs-lh-42 {
          line-height: 42px !important
        }
      }
    </style>
    <!--[if mso]>
      <style type="text/css">
          .pc-fb-font {
              font-family: Helvetica, Arial, sans-serif !important;
          }
      </style>
      <![endif]-->
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  </head>
  <body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
    <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
    <table class="pc-email-body" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
      <tbody>
        <tr>
          <td class="pc-email-body-inner" align="center" valign="top">
            <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" src="" color="#f4f4f4"></v:fill>
              </v:background>
              <![endif]-->
            <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
            <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
              <tbody>
                <tr>
                  <td align="left" valign="top" style="padding: 0 10px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- BEGIN MODULE: Feature 1 -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td class="pc-sm-p-35-10-15 pc-xs-p-25-0-5" style="padding: 40px 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);" valign="top" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px;" valign="top">update on articles you liked</td>
                                </tr>
                                <tr>
                                  <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px;" valign="top">
                                    ${message}<br>
                                  </td>
                                </tr>
                                <tr>
                                  <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td style="font-size: 0;" valign="top">
                                    <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="33%" valign="top"><![endif]-->
                                    <div class="pc-sm-mw-50pc pc-xs-mw-100pc" style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                        <tbody>
                                          <tr>
                                            <td style="padding: 20px;" valign="top">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td valign="top">
                                                      <img src="https://i.imgur.com/S4tiwmL.jpg" width="48" height="48" alt="" style=" max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;" valign="top">
                                                      Fun
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;" valign="top">
                                                      With a large community of writers, have fun with their articles
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                                    <div class="pc-sm-mw-50pc pc-xs-mw-100pc" style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                        <tbody>
                                          <tr>
                                            <td style="padding: 20px;" valign="top">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td valign="top">
                                                      <img src="https://i.imgur.com/KoWw3ca.jpg" width="48" height="48" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;" valign="top">
                                                      Emailed
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;" valign="top">
                                                      Get updates on your favorite articles and writer
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                                    <div class="pc-sm-mw-50pc pc-xs-mw-100pc" style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                        <tbody>
                                          <tr>
                                            <td style="padding: 20px;" valign="top">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td valign="top">
                                                      <img src="https://i.imgur.com/HCk5wcB.jpg" width="48" height="48" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;" valign="top">
                                                      Write
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;" valign="top">
                                                      You too, can be a writer, try us.
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- END MODULE: Feature 1 -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <footer> 
    This message was sent to you, If you don't want to receive these emails from AuthorsHaven in the future, please <a href="https://ah-92explorers-api.herokuapp.com/api/subscribe">unsubscribe</a>.</footer>
    <!-- Fix for Gmail on iOS -->
    <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
  </body>
  </html>`;

export default { emailTemplates, notificationTemplate };
