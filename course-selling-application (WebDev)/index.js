import express from 'express';
import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';

const app = express();

app.use('/user', userRouter);

app.use('/course', courseRouter);

app.listen(3000);