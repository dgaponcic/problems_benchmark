const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const benchmarkRoute = require("./routes/benchmark");
const cors = require('cors')
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require("./routes/user");
const logger = require('./common/logging/winston');
const { error_handler } = require('./common/error_handling/error.handler');
require('./database/mongo');
const { passportConfig } = require('./config/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

app.use(morgan('common', {
  stream: {
    write: (message) => logger.info(message)
  }
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use('/benchmark', benchmarkRoute);
app.use('/users', userRoute);
app.use(error_handler);
app.listen(port);
