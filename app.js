const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
