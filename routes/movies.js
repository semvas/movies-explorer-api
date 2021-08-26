const router = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

const { validateId, validateMovie } = require('../middlewares/validation');

router.get('/movie', getMovies);
router.post('/movie', validateMovie, createMovie);
router.delete('/movie/:movieId', validateId, removeMovie);

module.exports = router;
