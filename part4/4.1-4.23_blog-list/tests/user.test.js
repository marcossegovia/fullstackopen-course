const supertest = require('supertest');
const {
  test, beforeEach, after, describe,
} = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/user');
const app = require('../app');

const api = supertest(app);

describe('having some initial db users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', password: passwordHash });

    await user.save();
  });

  test('verify it can create user', async () => {
    const newUser = {
      username: 'marcos',
      name: 'Marcos Segovia',
      password: 'jijijojo',
    };
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const users = await User.find({});

    assert.strictEqual(users.length, 2);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
