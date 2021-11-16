import express from 'express';
import morgan from 'morgan';
// import 'dotenv/config';

import './db/mongoose.js';
import UserRouter from './entities/users/UserRouter.js';

const app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Application is running ');
});

app.use('/api/v1/users', UserRouter);
// app.use('/tasks', taskRouter);

export default app;
