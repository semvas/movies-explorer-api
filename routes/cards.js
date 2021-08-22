const router = require('express').Router();

const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const { validateId, validateCard } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:cardId', validateId, removeCard);
router.put('/cards/:cardId/likes', validateId, likeCard);
router.delete('/cards/:cardId/likes', validateId, disLikeCard);

module.exports = router;
