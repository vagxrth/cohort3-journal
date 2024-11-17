import express from 'express'
import { adminCheck } from '../auth.js';
import { adminModel } from '../db.js';

const adminRouter = express.Router();


adminRouter.post('/signup', (req, res) => {
    res.json({
        username: "oniichan",
        password: "juiichi"
    })
})

adminRouter.post('/signin', (req, res) => {

})

adminRouter.post('/create', adminCheck, (req, res) => {

})

adminRouter.get('/all', adminCheck, (req, res) => {

})

export default adminRouter