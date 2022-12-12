const app = require('../app');
const request = require('supertest');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');

afterAll(() => db.end());
beforeEach(() => seed(testData))

describe('api', () => {
  describe('GET /api/topics', () => {
    test('status: 200, returns an object with key \'topics\' with value of an array of objects', () => {
      return request(app)
              .get('/api/topics')
              .expect(200)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .then(({ body }) => {
                const topics = body.topics;
                topics.forEach((topic) => {
                  expect(topic).toMatchObject({slug: expect.any(String), description: expect.any(String)});
                })
              });
    });

    test('status: 404, when user tries to GET from misspelt endpoint', () => {
      return request(app)
              .get('/api/tciops')
              .expect(404)
              .then(({ body }) => {
                expect(body.message).toBe('Not Found');
              })
    });
  });
})