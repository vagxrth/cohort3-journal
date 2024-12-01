import express from "express";
import { z } from "zod"; 
import bcrypt from "bcrypt";
import { UserModel } from "../db.js";

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

    const user = await UserModel.find({
        email: email
    })

    if (!user) {
        return res.status(400).json({
            message: "The User doesn't exist!"
        })
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
        return res.status(400).json({
            message: "Incorrect Credentials"
        })
    }
})

userRouter.get("/courses", (req, res) => {

})

export default userRouter;