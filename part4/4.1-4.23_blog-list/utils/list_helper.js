const _ = require('lodash');

const mostLikes = (blogs) => _.chain(blogs)
  .groupBy('author')
  .map((blogs, author) => ({ author, likes: blogs.reduce((acc, blog) => acc += blog.likes, 0) }))
  .orderBy('likes', 'desc')
  .first()
  .value();

const mostBlogs = (blogs) => _.chain(blogs)
  .groupBy('author')
  .map((blogs, author) => ({ author, blogs: blogs.length }))
  .orderBy('blogs', 'desc')
  .first()
  .value();

const favoriteBlog = (blogs) => blogs.map((blog) => ({ title: blog.title, author: blog.author, likes: blog.likes }))
  .reduce((acc, blog) => (acc ? (acc.likes > blog.likes ? acc : blog) : blog), null);

const totalLikes = (blogs) => blogs.reduce(((acc, blog) => acc += blog.likes), 0);

const dummy = () => 1;

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
