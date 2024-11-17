import express from 'express'
import { userCheck } from '../auth.js';
import { userModel } from '../db.js';

const userRouter = express.Router();


userRouter.post('/signup', (req, res) => {
    res.json({
        username: 'username',
        password: 'password'
    })
})

userRouter.post('/signin', (req, res) => {

})

userRouter.get('/purchases', userCheck, (req, res) => {

})

export default userRouter;