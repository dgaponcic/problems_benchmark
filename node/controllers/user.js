const User = require('../models/user');
const userService = require('../services/user');

async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;
    await userService.createUser(username, password, email);
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'User already exists' });
    } else {
      res.status(error.status).send({ error });
    }
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userService.getUser(username, password);
    if (!user) {
      return res.status(404).send({ message: 'No user found' });
    }
    const token = userService.getToken(user);
    res.send({ msg: 'Success.', token, role: user.role });
  } catch (error) {
    console.log(error)
    res.status(error.status).send(error);
  }
}

async function getType(req, res) {
  return user.role;
}

module.exports = { createUser, login, getType };
