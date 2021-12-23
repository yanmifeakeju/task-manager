import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

beforeAll(() => {
  db.connect();
});

afterEach(() => db.clearDatabase());

const validData = {
  firstName: 'user',
  lastName: 'one',
  username: 'user_one',
  email: 'user@email.com',
  password: 'user$passw0rD',
};

const createUser = async (data = validData) => {
  const user = await User.create(data);
  return user;
};

describe('Password Recovery', () => {
  it('return 404 for non-registered email request and invalid email message in request body', async () => {
    const response = await request(app)
      .post('/api/v1/users/recovery')
      .send({ email: 'Tola email' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  it('return 200 OK when a valid user request password change', async () => {
    const user = await createUser();

    const response = await request(app)
      .post('/api/v1/users/recovery')
      .send({ email: user.email });

    expect(response.status).toBe(200);
  });
  it('expect users to have both password and password reset token in database', async () => {
    await createUser();

    await request(app)
      .post('/api/v1/users/recovery')
      .send({ email: validData.email });

    const user = await User.findOne({ email: validData.email });

    expect(user.resetToken).toBeTruthy();
    expect(user.resetTokenExpiresIn).toBeTruthy();
  });

  it('return 404 when incorrect token is sent for  password change request', async () => {
    await createUser({
      ...validData,
      resetToken: 'aresettoken',
      resetTokenExpiresIn: new Date(),
    });

    const response = await request(app)
      .put('/api/v1/users/recovery')
      .send({ token: 'aresetto', password: 'user$passw1d#D' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      'Unable to retrieve user data',
    );
  });

  it('return 404 when token sent has expired for  password change request', async () => {
    await createUser({
      ...validData,
      resetToken: 'aresettoken',
      resetTokenExpiresIn: new Date(
        new Date().getTime() - 20 * 1000 * 60,
      ),
    });

    const response = await request(app)
      .put('/api/v1/users/recovery')
      .send({ token: 'aresettoken', password: 'user$passw1d#D' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      'Token expired. Please make another request',
    );
  });

  it('return 200 when correct and non-expired token is sent for  password change request', async () => {
    await createUser({
      ...validData,
      resetToken: 'aresettoken',
      resetTokenExpiresIn: new Date(
        new Date().getTime() + 20 * 1000 * 60,
      ),
    });

    const response = await request(app)
      .put('/api/v1/users/recovery')
      .send({ token: 'aresettoken', password: 'user$passw1d#D' });

    expect(response.status).toBe(200);
  });
});
