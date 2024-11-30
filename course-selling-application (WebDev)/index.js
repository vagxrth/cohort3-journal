import express from 'express';
import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';
import adminRouter from './routes/admin.js';
import dotenv from "dotenv";
import mongoose  from "mongoose";

dotenv.config()

await mongoose.connect(process.env.CONNECTION_STRING);

const app = express();

app.use('/user', userRouter);

app.use('/course', courseRouter);

app.use('/admin', adminRouter);

app.listen(3000);