/* eslint-disable no-shadow */
import express from 'express';
import morgan from 'morgan';

import usersRouter from './entities/users/routes.js';
import authRouter from './entities/auth/routes.js';
import tasksRouter from './entities/tasks/routes.js';
import errorResponder from './middlewares/error.js';

const app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Application is running ');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

// app.use('/tasks', taskRouter);

app.use(errorResponder);

export default app;
