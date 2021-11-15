import express from 'express';
import morgan from 'morgan';
// import 'dotenv/config';

import './db/mongoose.js';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/users.js';

const app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', (req, res) => {
  res.send('Application is running ');
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

export default app;
