import { transporter } from '../../config/email.js';

export const sendActivationToken = async ({ email, token }) => {
  try {
    const mailed = await transporter.sendMail({
      from: 'Task App <no-reply@taskapp.com',
      to: email,
      subject: 'Account Activation',
      text: `Please click this link to activate your account ${token}`,
    });
    console.log(mailed);
  } catch (error) {
    const err = {
      message: 'Error creating email',
      type: 'EMAIL_FAILURE',
    };
    throw new Error(err);
  }
};
