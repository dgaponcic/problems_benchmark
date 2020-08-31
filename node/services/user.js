const passport = require('../config/passport');
const User = require('../models/user');
const passwordService = require('./password');

function getToken(user) {
  return passport.getToken(user);
}

async function createUser(username, rawPassword, email) {
  const hashedPassword = await passwordService.hashPassword(rawPassword);
  const user = new User({ username, password: hashedPassword, email, role: "basic" });
  return await user.save();
}

async function getUser(username, rawPassword) {
  const user = await findUserByEmailOrUsername(username);
  if (!user) {
    return null;
  }
  const isPasswordValid = await passwordService.verifyPassword(rawPassword, user.password);
  if (isPasswordValid) {
    return user;
  }
  return null;
}

async function findUserByEmailOrUsername(input) {
  const user = await User.findOne({
    $or: [{ email: input }, { username: input }],
  });
  return user;
}

module.exports = { createUser, getToken, getUser };
