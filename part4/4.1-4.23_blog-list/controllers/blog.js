const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  if (!request.token || !request.user) {
    return response.status(403).end();
  }

  const blog = new Blog({ ...request.body, user: request.user.id });
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  if (!request.token || !request.user) {
    return response.status(403).end;
  }
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog !== null) {
    if (blog.user.toString() !== request.user.id) {
      response.status(403).end();
    }
    const result = await Blog.deleteOne({ id: blogId });
    response.status(204).json(result);
  }
  response.status(404).end();
});

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog !== null) {
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, {
      new: true,
      runValidators: true,
      context: 'query',
    }).populate('user');
    response.status(200).json(result);
  }
  response.status(404).end();
});

module.exports = blogRouter;
