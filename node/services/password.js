const bcrypt = require('bcryptjs');

async function hashPassword(rawPassword) {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(rawPassword, saltRounds);
  return hashPassword;
}

async function verifyPassword(rawPassword, hashedPassword) {
  return await bcrypt.compare(rawPassword, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };
