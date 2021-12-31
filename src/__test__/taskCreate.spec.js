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

  it('returns 400 for authenticated request with empty fields and values', async () => {
    const user = await createUser(validData);
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.data.validationErrors).toBeTruthy();
  });
});
