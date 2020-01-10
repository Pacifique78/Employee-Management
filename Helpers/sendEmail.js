import nodemailer from 'nodemailer';

const sendMail = async (token = '', email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    if (token === '') {
      await transporter.sendMail({
        from: '"Kigali coding" <kigalicodingacademy@gmail.com>',
        to: email,
        subject: 'Task Force',
        html: `This is to inform you that you have joined Task Force Company <br>
        Look forward to metting you`,
      });
    } else {
      const url = `http://localhost:5000/auth/confirmation/${token}`;
      await transporter.sendMail({
        from: '"Kigali coding" <kigalicodingacademy@gmail.com>',
        to: email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default sendMail;
