import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import { createUser } from './utils.js';
import app from '../server.js';

beforeAll(() => db.connect());
afterEach(() => db.clearDatabase());

const validData = {
  firstName: 'user',
  lastName: 'one',
  username: 'user_one',
  email: 'user@email.com',
  password: 'user$passw0rD',
  active: true,
};

describe('Task Creation', () => {
  it('return  401 when for unauthenitcated request', async () => {
    const response = await request(app).post('/api/v1/tasks');

    expect(response.status).toBe(401);
  });

  it('returns 400 for authenticated request with empty fields', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.data.validationErrors).toBeTruthy();
  });

  it('returns 400 for authenticated request with invalid fields', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'random name', lastname: 'random lastname' });

    expect(response.status).toBe(400);
    expect(response.body.data.validationErrors).toBeTruthy();
  });

  it('returns 400 for authenticated request with valid fields but invalid values', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 40, description: 50 });

    expect(response.status).toBe(400);
    expect(response.body.data.validationErrors).toBeTruthy();
  });

  it('returns 400 for authenticated request with valid fields and valid values, but invlaid value for optional field', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'a title',
        description: 'a description',
        priority: 'mademan',
      });

    expect(response.status).toBe(400);
    expect(response.body.data.validationErrors).toBeTruthy();
  });

  it('returns 201 for authenticated request with valid fields and valid values', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'a title', description: 'a description' });

    expect(response.status).toBe(201);
  });

  it('returns 201 for authenticated request with valid fields and valid values and valid value for optional field', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'a title',
        description: 'a description',
        priority: 'low',
      });

    expect(response.status).toBe(201);
  });

  it('returns 201 for authenticated request with valid fields and values with task data in request body', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'a title',
        description: 'a description',
        priority: 'low',
      });

    expect(response.status).toBe(201);
    expect(response.body.data.task).toBeTruthy();
  });
});
