/* eslint-disable no-undef */
import request from 'supertest';
import app from '../server.js';

describe('User Registration', () => {
  const postUserData = async (data) => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(data);

    console.log(response.status);
    return response;
  };

  it('returns 201 Created when request is valid', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
      password: 'user_password'
    };
    const response = await postUserData(data);
    expect(response.status).toBe(201);
  });

  it('returns 422 if firstName field is not provided', async () => {
    const data = {
      lastName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
      password: 'user_password'
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if lastName field is not provided', async () => {
    const data = {
      firstName: 'one',
      username: 'user_one',
      email: 'user_one@email.com',
      password: 'user_password'
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if username field is not provided', async () => {
    const data = {
      firstName: 'one',
      lastName: 'one',
      email: 'user_one@email.com',
      password: 'user_password'
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if email field is not provided', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      password: 'user_password'
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });

  it('returns 422 if password field is not provided', async () => {
    const data = {
      firstName: 'user',
      lastName: 'one',
      username: 'user_one',
      email: 'user_one@email.com'
    };
    const response = await postUserData(data);

    expect(response.status).toBe(422);
  });
});
