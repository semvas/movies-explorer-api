const router = require('express').Router();

const {
  getUserById,
  updateUser,
} = require('../controllers/users');

const { validateId, validateUserInfo } = require('../middlewares/validation');

router.get('/users/me', validateId, getUserById);
router.patch('/users/me', validateUserInfo, updateUser);

module.exports = router;
