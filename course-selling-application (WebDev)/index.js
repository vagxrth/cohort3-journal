import express from 'express'
import jwt from 'jsonwebtoken'
import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';
import adminRouter from './routes/admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const Router = express.Router();

app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter)


app.delete('/delete', (req, res) => {

})

app.post('/content', (req, res) => {

})

const connection = async() => {
    await mongoose.connect(process.env.CONNECTION_STRING)
    app.listen(3000);

}

connection();