const mongoose = require('mongoose');

const dbURI = `${process.env['MONGO_CONNECTION']}://${process.env['MONGO_USER']}:${process.env['MONGO_PASSWORD']}@${process.env['MONGO_SERVER']}${process.env['MONGO_PORT']}.${process.env['MONGO_HOST']}:${process.env['MONGO_PORT']}/${process.env['MONGO_NAME']}`;

mongoose.Promise = Promise;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(() => {
    console.log('Database connection failed.');
  });


mongoose.set('useCreateIndex', true);
