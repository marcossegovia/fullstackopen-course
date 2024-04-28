const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../model/blog');
const User = require('../model/user');

const api = supertest(app);

const blogs = [
  {
    title: 'Hello Marcos',
    author: 'marcos',
    url: 'url-sample',
    likes: 2,
  },
  {
    title: 'Hello Miriam',
    author: 'miriam',
    url: 'url-sample-2',
    likes: 1,
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret1', 10);
  const user1 = new User({ username: 'unusedUser', name: 'Unknown', password: passwordHash });
  await user1.save();
  const user2 = new User({ username: 'marcos123', name: 'Marcos Segovia', password: passwordHash });
  const savedUser = await user2.save();
  await Blog.deleteMany({});
  await (new Blog({ ...blogs[0], user: savedUser.id })).save();
  await (new Blog({ ...blogs[1], user: savedUser.id })).save();
});

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 2);
});
test('verify id key exists', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((r) => assert('id' in r));
});

test('blogs can be post', async () => {
  const loginResponse = await loginUser();

  const newBlog = {
    title: 'Hello new',
    author: 'new',
    url: 'url',
    likes: 0,
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 3);
});

test('blogs should not be post if no valid token', async () => {
  const newBlog = {
    title: 'Hello new',
    author: 'new',
    url: 'url',
    likes: 0,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(403);
});

test('blogs are returned following given format for id', async () => {
  const loginResponse = await loginUser();

  const newBlog = {
    title: 'Hello new',
    author: 'new',
    url: 'url',
    likes: 0,
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const record = response.body.find((b) => b.title === 'Hello new');
  assert.strictEqual('id' in record, true);
  assert.strictEqual('_id' in record, false);
  assert.strictEqual('__v' in record, false);
  assert.strictEqual('user' in record, true);
  assert.strictEqual('username' in record.user, true);
  assert.strictEqual('name' in record.user, true);
  assert.strictEqual('id' in record.user, true);
  assert.strictEqual(response.body.length, 3);
});

test('verify default value for likes is 0', async () => {
  const loginResponse = await loginUser();

  const newBlog = {
    title: 'Hello new',
    author: 'new',
    url: 'url',
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const record = response.body.find((b) => b.title === 'Hello new');
  assert.strictEqual(record.likes, 0);
});

test('verify returns 400 for wrong input', async () => {
  const loginResponse = await loginUser();

  const newBlog = {
    title: 'Hello new',
    url: 'url',
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('verify is able to delete a post', async () => {
  const response = await api.get('/api/blogs');
  const record = response.body.find((b) => b.title === 'Hello Marcos');
  const loginResponse = await loginUser('unusedUser');
  await api
    .delete(`/api/blogs/${record.id}`)
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .expect(403);
});

test('verify is not able to delete a post due that not correct user', async () => {
  const loginResponse = await loginUser();
  const response = await api.get('/api/blogs');
  const record = response.body.find((b) => b.title === 'Hello Marcos');
  await api
    .delete(`/api/blogs/${record.id}`)
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .expect(204);
});

test('verify is able to update a post', async () => {
  const response = await api.get('/api/blogs');
  const record = response.body.find((b) => b.title === 'Hello Marcos');
  record.likes = 5;
  const result = await api.put(`/api/blogs/${record.id}`)
    .send(record)
    .expect(200);

  assert.strictEqual(result.body.likes, 5);
});

after(async () => {
  await mongoose.connection.close();
});

const loginUser = (username, password) => {
  const user = {
    username: username === undefined ? 'marcos123' : username,
    password: password === undefined ? 'sekret1' : password,
  };
  return api.post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);
};
