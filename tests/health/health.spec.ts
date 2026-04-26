import request from 'supertest';
import { app } from '../../src/app';

describe('Health', () => {
  it('should return API health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('ok');
    expect(response.body.message).toBe('API disponivel.');
  });
});
