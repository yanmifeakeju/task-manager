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
});
