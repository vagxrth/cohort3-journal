import express from 'express'
import { courseModel } from '../db.js';

const courseRouter = express.Router();

courseRouter.get('/courses/all', (req, res) => {

})

courseRouter.post('/courses/purchase', (req, res) => {

})

export default courseRouter;