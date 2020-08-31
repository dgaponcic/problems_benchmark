const jwt = require('jsonwebtoken');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user');

function passportConfig(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');

  opts.secretOrKey = process.env['PASSPORT_SECRET_KEY'];

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
}

function getToken(user) {
  return jwt.sign({ id: user.id, }, process.env['PASSPORT_SECRET_KEY'], { expiresIn: '2h' });
}

module.exports = { passportConfig, getToken };
