import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

jest.setTimeout(5000000);

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

describe('User Authorization', () => {
  it('It returns 401 for incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: validData.email, password: validData.password });

    const { status } = response;

    expect(status).toBe(401);
  });

  it('It returns 401 if an non-active user tries to log in', async () => {
    await createUser();

    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: validData.email, password: validData.password });

    const { status, body } = response;

    expect(status).toBe(401);
    expect(body.message).toBe(
      'Please activate you need to activate your account',
    );
  });

  it('It returns status 200 and sends token when an active user logs in', async () => {
    await createUser({ ...validData, active: true });

    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: validData.email, password: validData.password });

    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.data.token).toBeTruthy();
  });

  it('return a token present in the user when an active user logs in', async () => {
    await createUser({ ...validData, active: true });

    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: validData.email, password: validData.password });

    const { body } = response;
    const [user] = await User.find({});
    const { token } = user.tokens[0];

    expect(body.data.token).toEqual(token);
  });

  it('return 200 and users data when an authorized request is made by an active user', async () => {
    const user = await createUser({ ...validData, active: true });
    const authorizationToken = await user.generateAuthToken();

    const response = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${authorizationToken}`);
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.data.user.firstName).toBe(user.firstName);
    expect(body.data.user.email).toBe(user.email);
  });

  it('return 401 when an authorized request is made by an active user', async () => {
    await createUser({ ...validData, active: true });

    const response = await request(app).get('/api/v1/users/me');

    const { status } = response;

    expect(status).toBe(401);
  });

  it('it return 200 and remove token when a user logouts', async () => {
    let user = await createUser({ ...validData, active: true });
    const authorizationToken = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/auth/revoke')
      .set('Authorization', `Bearer ${authorizationToken}`);

    const { status } = response;
    [user] = await User.find({});

    expect(status).toBe(200);
    expect(user.tokens.length).toBe(0);
  });
});
