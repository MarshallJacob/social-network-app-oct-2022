const { Schema, model } = require('mongoose');

// Use  a regex to validate the email
const validateEmail = function(email) {
    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email)
};

// Create a schema for the user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
    },
    // TODO: Maybe need to change to just "type: Array"
    thought: {
        type: Array,
    },
    friends: {
        type: []
    },
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
    },
  }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.reduce( () => this.friends.length, 0);
});


const User = model('user', userSchema);

module.exports = User;
