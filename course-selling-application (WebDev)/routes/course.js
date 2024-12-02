import express from 'express';
import userAuth from '../middlewares/user.js';
import { PurchaseModel } from '../db.js';

const courseRouter = express.Router();

courseRouter.get("/catalog", (req, res) => {
    res.send("hajimemashte")
})

courseRouter.post("/buy", userAuth, async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    const purchase = await PurchaseModel.create({
        course: courseId,
        user: userId
    })

    if (purchase) {
        res.json({
            message: "Purchase Successful",
            purchase
        })
    } else {
        res.status(400).json({
            message: 'Error purchasing the course!s'
        })
    }
})

export default courseRouter;