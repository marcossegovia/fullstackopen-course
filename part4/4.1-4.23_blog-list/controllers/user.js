const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');

userRouter.get('/', async (request, response) => {
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });
  const result = await user.save();
  response.status(201).json(result);
});

module.exports = userRouter;
