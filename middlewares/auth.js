const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация. Отсутствует заголовок Authorization.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production'
      ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизация. Неверный token.');
  }

  req.user = payload;
  next();
};

module.exports = auth;
