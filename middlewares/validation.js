const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL, isEmail } = require('validator');

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
    cardId: Joi.string().hex().length(24),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
    password: Joi.string().required().min(4),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
    password: Joi.string().required().min(4),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

module.exports = {
  validateId,
  validateLogin,
  validateUser,
  validateUserInfo,
  validateAvatar,
  validateCard,
};
