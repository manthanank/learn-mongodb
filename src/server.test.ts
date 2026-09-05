import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from './server.js';
import { mockDb } from './db.js';

describe('MongoDB Curriculum API & Aggregation Sandbox Suite', () => {
  beforeEach(() => {
    mockDb.reset();
  });

  describe('GET /api/health', () => {
    it('should return 200 with service metadata', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('learn-mongodb-api');
      expect(res.body.version).toBe('2.0.0');
    });
  });

  describe('User CRUD Operations', () => {
    it('should retrieve list of users with pagination metadata', async () => {
      const res = await request(app).get('/api/users?page=1&pageSize=2');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.meta.pageSize).toBe(2);
      expect(res.body.data.length).toBe(2);
    });

    it('should filter users by department', async () => {
      const res = await request(app).get('/api/users?department=Engineering');
      expect(res.status).toBe(200);
      expect(res.body.data.every((u: { department: string }) => u.department === 'Engineering')).toBe(true);
    });

    it('should create a new user document', async () => {
      const newUser = {
        firstName: 'Jordan',
        lastName: 'Lee',
        email: 'jordan.lee@test.io',
        department: 'Product',
        salary: 125000,
        age: 30
      };

      const res = await request(app).post('/api/users').send(newUser);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('jordan.lee@test.io');
      expect(res.body.data._id).toBeDefined();
    });

    it('should reject user creation when required fields are missing', async () => {
      const res = await request(app).post('/api/users').send({ firstName: 'OnlyFirst' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should retrieve user by ID', async () => {
      const listRes = await request(app).get('/api/users');
      const targetId = listRes.body.data[0]._id;

      const res = await request(app).get(`/api/users/${targetId}`);
      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(targetId);
    });

    it('should return 404 for non-existent user ID', async () => {
      const res = await request(app).get('/api/users/nonexistent123');
      expect(res.status).toBe(404);
    });

    it('should update user fields by ID', async () => {
      const listRes = await request(app).get('/api/users');
      const targetId = listRes.body.data[0]._id;

      const updateRes = await request(app)
        .put(`/api/users/${targetId}`)
        .send({ salary: 195000 });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.salary).toBe(195000);
    });

    it('should delete a user document by ID', async () => {
      const listRes = await request(app).get('/api/users');
      const targetId = listRes.body.data[0]._id;

      const delRes = await request(app).delete(`/api/users/${targetId}`);
      expect(delRes.status).toBe(200);
      expect(delRes.body.success).toBe(true);

      const getRes = await request(app).get(`/api/users/${targetId}`);
      expect(getRes.status).toBe(404);
    });
  });

  describe('Aggregation Framework Sandbox', () => {
    it('should execute faceted aggregation with metadata and stats', async () => {
      const res = await request(app).get('/api/users/faceted?page=1&pageSize=3');
      expect(res.status).toBe(200);
      expect(res.body.result).toBeDefined();
      expect(res.body.result.metadata).toBeDefined();
      expect(res.body.result.departmentStats).toBeDefined();
    });

    it('should return pre-configured enterprise sample pipelines', async () => {
      const res = await request(app).get('/api/sample-pipelines');
      expect(res.status).toBe(200);
      expect(res.body.samples.length).toBeGreaterThanOrEqual(3);
    });

    it('should evaluate custom aggregation pipeline in sandbox', async () => {
      const pipeline = [
        { $match: { department: 'Engineering' } },
        { $group: { _id: '$department' } }
      ];

      const res = await request(app).post('/api/aggregate').send({ pipeline });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.results.length).toBeGreaterThan(0);
    });

    it('should return error when pipeline is not an array', async () => {
      const res = await request(app).post('/api/aggregate').send({ pipeline: 'invalid' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('ESR Index Optimizer', () => {
    it('should recommend compound index following Equality, Sort, Range order', async () => {
      const payload = {
        filter: {
          department: 'Engineering',
          age: { $gte: 25 }
        },
        sort: {
          salary: -1
        }
      };

      const res = await request(app).post('/api/index-analyzer').send(payload);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const keys = Object.keys(res.body.analysis.recommendedIndex);
      // ESR: department (Equality) -> salary (Sort) -> age (Range)
      expect(keys[0]).toBe('department');
      expect(keys[1]).toBe('salary');
      expect(keys[2]).toBe('age');
      expect(res.body.analysis.recommendedIndex.salary).toBe(-1);
    });
  });
});
