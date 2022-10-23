const { connect, connection } = require('mongoose');

// TODO: add the correct path
connect('mongodb://localhost/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
