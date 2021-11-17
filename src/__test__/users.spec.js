/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
import User from '../entities/users/User.js';
import app from '../server.js';

beforeAll(async () => User.deleteMany({}));
afterAll(async () => User.deleteMany({}));
jest.setTimeout(30000);

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
});
