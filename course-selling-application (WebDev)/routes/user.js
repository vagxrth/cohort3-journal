import express from "express";
import { z } from "zod"; 
import bcrypt from "bcrypt";
import { CourseModel, PurchaseModel, UserModel } from "../db.js";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/user.js"

const userRouter = express.Router();


//signup
userRouter.post("/signup", async(req, res) => {
    
    const requiredSchema = z.object({
        name: z.string().max(30),
        email: z.string().email(),
        password: z.string().max(50)
    });

    const parseBody = requiredSchema.safeParse(req.body);

    if (!parseBody.success) {
        return res.status(400).json({
            message: "Invalid Inputs!",
            error: parseBody.error
        })
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        
        await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            message: 'You are signed up!'
        })
    } catch (error) {
        res.status(400).json({
            message: "Error Occurred!"
        })
    }

})


//signin
userRouter.post("/signin", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    })

    if (!user) {
        return res.status(400).json({
            message: "The User doesn't exist!"
        })
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
        const token = jwt.sign({
            id: user._id
        }, process.env.USER_JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

userRouter.get("/courses", userAuth, async(req, res) => {
    const userId = req.userId;

    const courses = await PurchaseModel.find({
        user: userId,
    })

    if (courses) {
        const courseData = await CourseModel.find({
            _id: { $in: courses.map(x => x.course) }
        });
        res.json({
            message: "Fetched all your courses!",
            courses,
            courseData
        })
    } else {
        res.status(400).json({
            message: "Error fetching all your courses!"
        })
    }
})

export default userRouter;