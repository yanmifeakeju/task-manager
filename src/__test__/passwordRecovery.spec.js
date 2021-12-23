import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

beforeAll(() => {
  db.connect();
});

afterEach(() => db.clearDatabase());

describe('Password Recovery', () => {
  fit('return 404 for non-registered email requestand invalid email message in request body', async () => {
    const response = await request(app)
      .post('/api/v1/users/recovery')
      .send({ email: 'Tola email' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBeTruthy();
  });
});
