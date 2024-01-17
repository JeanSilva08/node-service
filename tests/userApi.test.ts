import request from 'supertest';
import { app } from '../src/index';

describe('User API', () => {
  it('should return user information for a valid user ID', async () => {
    const userId = '1';
    const response = await request(app).get(`/api/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userId: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should return 404 for an invalid user ID', async () => {
    const userId = 'invalidUserId';
    const response = await request(app).get(`/api/user/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });
});
