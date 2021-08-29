const router = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

const { validateId, validateMovie } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateMovie, createMovie);
router.delete('/movies/:movieId', validateId, removeMovie);

module.exports = router;
