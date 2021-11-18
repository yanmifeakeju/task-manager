/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

beforeAll(async () => {
  await db.connect();
});
afterAll(async () => {
  await db.clearDatabase();
});
afterAll(async () => {
  await db.closeConnection();
});

const validData = {
  firstName: 'user',
  lastName: 'one',
  username: 'user_one',
  email: 'user@email.com',
  password: 'user_password',
};

describe('User Registration', () => {
  const postUserData = async (data) => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(data);

    return response;
  };

  it('returns 422 if firstName field is not provided', async () => {
    const data = { ...validData, firstName: undefined };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if lastName field is not provided', async () => {
    const data = { ...validData, lastName: undefined };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if username field is not provided', async () => {
    const data = { ...validData, username: undefined };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if email field is not provided', async () => {
    const data = { ...validData, email: undefined };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if password field is not provided', async () => {
    const data = { ...validData, password: undefined };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if all field are not provided', async () => {
    const data = {};
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('it return 201 and stores valid request data in the database', async () => {
    const data = { ...validData };
    const response = await postUserData(data);

    const user = await User.findOne({ email: data.email });

    expect(response.status).toBe(201);
    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.username).toBe(data.username);
    expect(user.password).not.toBe(data.password);
    expect(user.email).toBe(data.email);
  });
});

describe('User Authentication', () => {
  it('does not log in a user with no email and password', async () => {
    const response = await request(app).post('/api/v1/auth').send({});

    expect(response.status).toBe(401);
  });

  it('does not log in a user with an invalid email address', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'invalidemail.com', password: 'invalid' });

    expect(response.status).toBe(401);
  });

  it('returns a jwt token when user provide valid email and adress', async () => {
    const { email, password } = validData;
    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeUndefined();
  });
});
