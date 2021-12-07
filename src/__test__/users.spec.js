/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
// import nodemailerStub from 'nodemailer-stub';
import * as db from './db.js';
import User from '../entities/users/model.js';
import * as EmailService from '../services/email/sendActivationToken.js';
import app from '../server.js';

beforeAll(async () => {
  await db.connect();
  await db.clearDatabase();
});

beforeEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.clearDatabase();
  await db.closeConnection();
});

const validData = {
  firstName: 'user',
  lastName: 'one',
  username: 'user_one',
  email: 'user@email.com',
  password: 'user$passw0rD',
};

const postUserData = async (data = validData) => {
  const response = await request(app)
    .post('/api/v1/users')
    .send(data);

  return response;
};

describe('User Registration: Validation', () => {
  it.each`
    field          | value             | testMessage
    ${`firstName`} | ${null}           | ${`returns 400 if firstname is null`}
    ${`lastName`}  | ${null}           | ${`returns 400 if lastName is null`}
    ${`username`}  | ${null}           | ${`returns 400 if username is null`}
    ${`username`}  | ${'usr'}          | ${`returns 400 if username is less than 4 characters`}
    ${`username`}  | ${'u'.repeat(31)} | ${`returns 400 if username is more than 30 characters`}
    ${`email`}     | ${null}           | ${`returns 400 if email is null`}
    ${`email`}     | ${'foo.bar'}      | ${`returns 400 if email is not valid`}
    ${`password`}  | ${null}           | ${`returns 400 if password is null`}
    ${`password`}  | ${'rr8eu'}        | ${`returns 400 if password is less than 6`}
    ${`password`}  | ${'alllowercase'} | ${`returns 400 if password does not contain 1 uppercase, 1 lowercase, 1 number, and 1 special character`}
    ${`password`}  | ${'ALLUPPERCASE'} | ${`returns 400 if password does not contain 1 uppercase, 1 lowercase, 1 number, and 1 special character`}
    ${`password`}  | ${33383838388}    | ${`returns 400 if password does not contain 1 uppercase, 1 lowercase, 1 number, and 1 special character`}
  `('$testMessage', async ({ field, value }) => {
    const user = {
      ...validData,
    };

    user[field] = value;

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
  });

  it('return 409 when email is in use', async () => {
    await User.create({ ...validData, username: 'tolani' });
    const response = await postUserData();

    const { status, body } = response;
    expect(status).toBe(409);
    expect(body.message).toBe('email is already registered');
  });

  it('return 409 when username is in use', async () => {
    await User.create({
      ...validData,
      email: 'tolani@t.com',
    });

    const response = await postUserData();

    const { status, body } = response;
    expect(status).toBe(409);
    expect(body.message).toBe('username is already registered');
  });
});

describe('User Creation', () => {
  it('creates new user and stores user in database', async () => {
    await postUserData();
    const [user] = await User.find({});

    expect(user.firstName).toBe(validData.firstName);
    expect(user.lastName).toBe(validData.lastName);
    expect(user.username).toBe(validData.username);
    expect(user.email).toBe(validData.email);
    expect(user.password).not.toBe(validData.password);
    expect(user.active).toBe(false);
    expect(user.activationToken).toBeTruthy();
  });

  it('expects new user to not be active and have activationToken', async () => {
    await postUserData();
    const [user] = await User.find({});

    expect(user.active).toBe(false);
    expect(user.activationToken).toBeTruthy();
  });

  // it('sends an account activation email with activationToken', async () => {
  //   await postUserData();
  //   const [user] = await User.find({});

  //   const lastMail = nodemailerStub.interactsWithMail.lastMail();
  //   expect(lastMail.to).toContain(user.email);
  //   expect(lastMail.content).toContain(user.activationToken);
  // });

  it('return 502 Bad Gateway when sending email fails', async () => {
    const mockAccountActivation = jest
      .spyOn(EmailService, 'sendActivationToken')
      .mockRejectedValue({ message: 'Failed to deliver email' });
    const response = await postUserData();
    const { status } = response;
    expect(status).toBe(500);
    mockAccountActivation.mockRestore();
  });

  // it('return 502 Bad Gateway when sending email fails', async () => {
  //   const mockAccountActivation = jest
  //     .spyOn(EmailService, 'sendActivationToken')
  //     .mockRejectedValue();
  //   const response = await postUserData();
  //   const { body } = response;
  //   mockAccountActivation.mockRestore();
  //   expect(body.message).toBe('Email failed');
  // });
});

describe('Accoun Activation', () => {
  it('activates the account when correct token is sent', async () => {
    await postUserData();
    let [user] = await User.find({});
    const token = user.activationToken;

    await request(app).post(`/api/v1/users/token/${token}`);
    [user] = await User.find({});

    expect(user.active).toBe(true);
    expect(user.activationToken).toBeFalsy();
    expect(user.activationTokeExpiresIn).toBeFalsy();
  });

  it('does not activate the account when incorrect token is sent', async () => {
    await postUserData();

    const token = 'incorrecttoken';

    await request(app).post(`/api/v1/users/token/${token}`);
    const [user] = await User.find({});

    expect(user.active).toBe(false);
    expect(user.activationToken).toBeFalsy();
    expect(user.activationTokeExpiresIn).toBeFalsy();
  });
});
