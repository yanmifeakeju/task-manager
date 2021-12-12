import { transporter } from '../../config/email.js';
import ErrorResponse from '../../error/ErrorResponse.js';

export const sendActivationToken = async ({ email, token }) => {
  try {
    await transporter.sendMail({
      from: 'Task App <no-reply@taskapp.com',
      to: email,
      subject: 'Account Activation',
      text: `Please click this link to activate your account ${token}`,
    });
  } catch (error) {
    throw new ErrorResponse('Unable to send activation email', 502);
  }
};
