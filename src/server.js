import express from 'express';
import morgan from 'morgan';

import UserRouter from './entities/users/router.js';
import authRouter from './entities/auth/routes.js';

const app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Application is running ');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', UserRouter);

// app.use('/tasks', taskRouter);

function errorLogger(error, req, res, next) {
  // eslint-disable-next-line no-console
  console.log(error);
  next(error);
}

function errorResponder(error, req, res, next) {
  if (error.code && error.code === 11000) {
    return res.status(409).json({
      status: false,
      message: 'Account exists',
      data: { fields: Object.keys(error.keyValue) },
    });
  }
  next(error);
}

function failSafeHandler(error, req, res) {
  res.status(500).send(error);
}

app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);

export default app;
