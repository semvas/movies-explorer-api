const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');

const auth = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
