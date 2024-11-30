import express from "express";
import { z } from "zod"; 
import bcrypt from "bcrypt";
import { UserModel } from "../db.js";

const userRouter = express.Router();

userRouter.post("/signup", async(req, res) => {
    
    const requiredSchema = z.object({
        name: z.string().max(30),
        email: z.email(),
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
        const hashedPassword = bcrypt.hash(password, 5);
        
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.json({
            message: 'You are signed up!'
        })
    } catch (error) {
        res.status(400).json({
            message: "Email already exists!"
        })
    }

})

userRouter.post("/signin", (req, res) => {

})

userRouter.get("/courses", (req, res) => {

})

export default userRouter;