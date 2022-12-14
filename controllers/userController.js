const { User } = require('../models');

module.exports = {
  // retrieves/creates a path to get info for all users  
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // retrieves the info for a single user
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // used to update user data  
  updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
  },
  // resmoves user data from database  
  deleteUser({ params}, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
  },
  // allows user to add a friend  
  addFriend({ params, body }, res) {
      User.findOneAndUpdate(
          { _id: params.id },
          { $push: {friends: params.friendId }},
          { new: true })
          .then(user => {
              if (!user) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(user);
          })
          .catch(err => res.json(err));
  },
  // remove friend from user data
  deleteFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId }},
          { new: true })
          .then(user => res.json(user))
          .catch(err => res.json(err));
  }
};
