const request = require('supertest');
const app = require('../../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
const email = `testuser@gmail.com`;

describe('Auth API Integration Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: email, password: 'Password@123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should log in a user and return a JWT token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: email, password: 'Password@123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: email, password: 'Password@123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should create a new category', async () => {
    const tokenRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@gmail.com', password: 'Password@123' });

    const token = tokenRes.body.token;

    const res = await request(app)
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics', status: 'active' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Electronics');
  });
});


