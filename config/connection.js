const { connect, connection } = require('mongoose');

// TODO: add the correct path
connect('mongodb://127.0.0.1:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
