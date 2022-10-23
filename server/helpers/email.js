const nodemailer = require("nodemailer");

const transporter = (email, password) =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

const sendEmail = async (
  to,
  subject,
  text,
  template,
  isAttachment,
  attachments
) => {
  if (!to) {
    return;
  }
  const emailer = transporter(process.env.EMAIL, process.env.EMAIL_PASSWORD);
  let mailOptions = {};
  if (isAttachment !== undefined) {
    mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html: template,
      attachments,
    };
  } else {
    mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html: template,
      icalEvent: attachments,
    };
  }
  emailer.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("error sending mail", err);
    } else {
      console.log(`email sent successfully at ${to}`);
    }
  });
};

module.exports = sendEmail;
