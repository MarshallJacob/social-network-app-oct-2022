const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Creates the route shown as /api/User/
router
  .route('/')
  .get(getUsers)
  .post(createUser);

   // creates routes for specific users friend list enabling update and delete functionality /api/users/:id/firends/:friendId
   router.route('/:id/friends/:friendId')
   .post(addFriend)
   .delete(deleteFriend)

// creates routes for specific user data enabling update and delete functionality /api/users/:id
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

 

module.exports = router;
