const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const { validateId, validateUserInfo, validateAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', validateId, getUserInfo);
router.get('/users/:id', validateId, getUserById);
router.patch('/users/me', validateUserInfo, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
