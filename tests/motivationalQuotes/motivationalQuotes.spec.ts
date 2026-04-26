import request from 'supertest';
import { app } from '../../src/app';

describe('Motivational Quotes', () => {
  it('should return a motivational quote', async () => {
    const response = await request(app).get('/motivational-quotes/random');

    expect(response.status).toBe(200);
    expect(response.body.data.quote).toEqual(expect.any(String));
    expect(response.body.data.quote.length).toBeGreaterThan(10);
  });
});
