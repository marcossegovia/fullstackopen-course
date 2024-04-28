const {
  test, beforeEach, after, describe,
} = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../model/user');

const api = supertest(app);
describe('having some initial db users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'marcos123', name: 'marcos segovia', password: passwordHash });

    await user.save();
  });

  test('verify user can be logged in', async () => {
    const user = {
      username: 'marcos123',
      password: 'sekret',
    };
    const result = await api.post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual('token' in result.body, true);
    assert.notEqual(result.body.token, '');
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
