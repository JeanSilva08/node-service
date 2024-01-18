import request from 'supertest';
import { app, getUserInfo } from '../src/index';

describe('User API', () => {
  it('should return user information for a valid user ID', async () => {
    const userId = '1';

    // Ensure that the user with ID '1' exists in your userDatabase
    // If 'getUserInfo(userId)' returns null, adjust the test accordingly
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

  it('should update user information via PUT request', async () => {
    const userId = 'validuser';
    const updatedInfo = {
      name: 'New Name',
      email: 'new.email@example.com',
    };

    const response = await request(app)
      .put(`/api/user/${userId}`)
      .send(updatedInfo);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User information updated successfully' });

    // Check if user information has been updated
    const updatedUserInfo = getUserInfo(userId);
    expect(updatedUserInfo).toEqual({
      userId,
      name: 'New Name',
      email: 'new.email@example.com',
    });
  });
});
