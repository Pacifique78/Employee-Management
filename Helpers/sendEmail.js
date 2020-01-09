import nodemailer from 'nodemailer';

const sendMail = async (req, res, token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const url = `http://localhost:5000/auth/confirmation/${token}`;
    await transporter.sendMail({
      from: '"Kigali coding" <kigalicodingacademy@gmail.com>',
      to: email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export default sendMail;
