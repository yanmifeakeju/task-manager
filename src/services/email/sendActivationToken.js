import { transporter } from '../../config/email.js';

export const sendActivationToken = async ({ email, token }) => {
  try {
    await transporter.sendMail({
      from: 'Task App <no-reply@taskapp.com',
      to: email,
      subject: 'Account Activation',
      text: `Please click this link to activate your account ${token}`,
    });
  } catch (error) {
    throw new Error('Error sending email');
  }
};
