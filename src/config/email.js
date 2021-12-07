import nodemailer from 'nodemailer';
// import nodemailerStub from 'nodemailer-stub';

export const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c28f7701bbd61e',
    pass: 'f3b058a53b5d99',
  },
});
