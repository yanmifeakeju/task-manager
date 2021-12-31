import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import User from '../entities/users/model.js';
import app from '../server.js';

beforeAll(() => db.connect());
afterEach(() => db.clearDatabase());

describe('Task Creation', () => {
  it('return  401 when for unauthenitcated request', async () => {
    const response = await request(app).post('/api/v1/tasks');

    expect(response.status).toBe(401);
  });
});
