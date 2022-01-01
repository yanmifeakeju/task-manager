import 'dotenv/config';
import request from 'supertest';
import * as db from './db.js';
import app from '../server.js';

import { createTaskWithUser, generateAuthToken } from './utils.js';

beforeAll(() => db.connect());
afterEach(() => db.clearDatabase());

describe('Adding Collaborators to Tasks', () => {
  it('return  401 when for unauthenitcated request to add collaborator to task', async () => {
    const response = await request(app).put(
      `/api/v1/tasks/4404adlkkdhd/collaborate`,
    );

    expect(response.status).toBe(401);
  });

  it('returns 400 for authorized request to without invalid task id', async () => {
    const token = await generateAuthToken();

    const response = await request(app)
      .put(`/api/v1/tasks/invalidtakdidd/collaborate`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'tabobita@email.com' });

    expect(response.status).toBe(400);
  });

  fit('return 400  for  authorized request without collaborator email in request body', async () => {
    const { user, task } = await createTaskWithUser();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/api/v1/tasks/${task.id}/collaborate`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
