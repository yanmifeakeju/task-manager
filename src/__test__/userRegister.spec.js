/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
import User from '../entities/users/User.js';
import app from '../server.js';

afterEach(async () => User.deleteMany({}));

jest.setTimeout(30000);

describe('User Registration', () => {
  const postUserData = async (data) => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(data);

    return response;
  };

  it('it return 201 and stores valid request data in the database', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      email: 'user@email.com',
      password: 'user_password',
    };
    const response = await postUserData(data);

    const user = await User.findOne({ email: data.email });

    expect(response.status).toBe(201);
    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.username).toBe(data.username);
    expect(user.password).not.toBe(data.password);
    expect(user.email).toBe(data.email);
  });

  it('returns 422 if firstName field is not provided', async () => {
    const data = {
      lastName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
      password: 'user_password',
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if lastName field is not provided', async () => {
    const data = {
      firstName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
      password: 'user_password',
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if username field is not provided', async () => {
    const data = {
      firstName: 'one',
      lastName: 'one',
      email: 'user_one@email.com',
      password: 'user_password',
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if email field is not provided', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      password: 'user_password',
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if password field is not provided', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });
});
