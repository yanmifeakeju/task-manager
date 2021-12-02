/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
// import jwt from 'jsonwebtoken';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

beforeAll(async () => {
  await db.connect();
  await db.clearDatabase();
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

const postUserData = async (data) => {
  const response = await request(app)
    .post('/api/v1/users')
    .send(data);

  return response;
};

describe('User Registration', () => {
  it.each`
    field          | expectedMessage
    ${`firstName`} | ${`returns 400 if firstname is null`}
    ${`lastName`}  | ${`returns 400 if lastName is null`}
    ${`username`}  | ${`returns 400 if username is null`}
    ${`email`}     | ${`returns 400 if email is null`}
    ${`password`}  | ${`returns 400 if password is null`}
  `(
    'returns $expectedMessage when $field is null',
    async ({ field }) => {
      const user = {
        firstName: 'user',
        lastName: 'one',
        username: 'user_one',
        email: 'user@email.com',
        password: 'user_password',
      };

      delete user[field];

      const response = await postUserData(user);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body.data.validationErrors).not.toBe(undefined);
      expect(body.data.validationErrors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field,
          }),
        ]),
      );
    },
  );
});
