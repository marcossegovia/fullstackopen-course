const _ = require('lodash');

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({author: author, likes: blogs.reduce((acc, blog) => acc = acc + blog.likes, 0)}))
    .orderBy('likes', 'desc')
    .first()
    .value()
}

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({author: author, blogs: blogs.length}))
    .orderBy('blogs', 'desc')
    .first()
    .value()
}

const favoriteBlog = (blogs) => {
  return blogs.map(blog => ({title: blog.title, author: blog.author, likes: blog.likes}))
    .reduce((acc, blog) => acc ? (acc.likes > blog.likes ? acc : blog) : blog, null)
}

const totalLikes = (blogs) => {
  return blogs.reduce(((acc, blog) => acc = acc + blog.likes), 0)
}

const dummy = () => {
  return 1
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}