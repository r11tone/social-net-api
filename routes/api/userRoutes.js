const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/api/Users')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/api/Users/:UserId')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/api/users/:userId/friends/:friendId')
  .post(userController.createFriend)
  .delete(userController.deleteFriend);

module.exports = router;
