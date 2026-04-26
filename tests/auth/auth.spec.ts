import request from 'supertest';
import { app } from '../../src/app';
import { validRegisterPayload } from '../helpers/auth';

describe('Auth', () => {
  it('should register a user successfully', async () => {
    const response = await request(app).post('/auth/register').send(validRegisterPayload());

    expect(response.status).toBe(201);
    expect(response.body.data.email).toContain('@example.com');
    expect(response.body.data.password).toBeUndefined();
  });

  it('should return conflict when registering duplicate email', async () => {
    const payload = validRegisterPayload();

    await request(app).post('/auth/register').send(payload);
    const response = await request(app).post('/auth/register').send(payload);

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('EMAIL_ALREADY_EXISTS');
  });

  it('should login successfully', async () => {
    const payload = validRegisterPayload();
    await request(app).post('/auth/register').send(payload);

    const response = await request(app).post('/auth/login').send({
      email: payload.email,
      password: payload.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.token).toEqual(expect.any(String));
  });

  it('should return unauthorized when password is invalid', async () => {
    const payload = validRegisterPayload();
    await request(app).post('/auth/register').send(payload);

    const response = await request(app).post('/auth/login').send({
      email: payload.email,
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('should validate required fields', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'invalid-email',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
