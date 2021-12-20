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

describe('User Update', () => {
  it('returns 401 unauthorized when request is sent without authorization', async () => {
    const response = await request(app).put('/api/v1/users/me').send({
      username: 'userone',
    });

    const { status } = response;

    expect(status).toBe(401);
  });

  it('return 403 forbidden when request is sent with invalid authorization', async () => {
    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', 'Bearer UUU')
      .send({
        username: 'userone',
      });

    const { status } = response;

    expect(status).toBe(403);
  });

  it('returns 400 Bad Request if request body contains invalid update field', async () => {
    const user = await createUser({ ...validData, active: true });
    const authorizationToken = await user.generateAuthToken();

    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send({
        password: 'total',
        id: 'me',
      });

    const { status, body } = response;
    expect(status).toBe(400);
    expect(body.data.validationErrors.length).toBeTruthy();
  });

  it('returns 200 with empty request body and valid authorization token', async () => {
    const user = await createUser({ ...validData, active: true });
    const authorizationToken = await user.generateAuthToken();

    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send({});

    const { status } = response;
    expect(status).toBe(200);
  });

  it('returns 200 with empty request body and with user data', async () => {
    const user = await createUser({ ...validData, active: true });
    const authorizationToken = await user.generateAuthToken();

    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send({});

    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.data.user).toBeTruthy();
    expect(body.data.user.firstName).toBe(user.firstName);
  });

  it('returns 400 with response updated user data', async () => {
    await createUser();

    const user = await createUser({
      ...validData,
      username: 'bola',
      email: 'bola@email.com',
      active: true,
    });
    const authorizationToken = await user.generateAuthToken();
    const update = {
      username: validData.username,
    };

    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send(update);

    const { status, body } = response;
    const notUpdated = await User.findById(user.id);

    expect(status).toBe(409);
    expect(body.data).toBeFalsy();
    expect(user.username).toBe(notUpdated.username);
  });
});
