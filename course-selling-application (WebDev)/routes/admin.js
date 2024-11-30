import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { adminModel } from "../db.js";

const adminRouter = express.Router();

adminRouter.post('/signup', async(req, res) => {
    
    const inputSchema = z.object({
        name: z.string().max(30),
        email: z.email(),
        password: z.string().max(50)
    })

    const parseInput = inputSchema.safeParse(req.body);

    if (!parseInput.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            error: parseInput.error
        })
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = bcrypt.hash(password, 5);

        await adminModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.json({
            message: "You are signed up!"
        })
    } catch (error) {
        res.status(400).json({
            message: "Email already exists"
        })
    }
    
});

adminRouter.post('/signin', (req, res) => {

})

adminRouter.get('/list', (req, res) => {
    
})

adminRouter.post('/create', (req, res) => {
    res.send("ohayogozaimasu")
})

adminRouter.put('/add', (req, res) => {
    
})

adminRouter.delete('/delete', (req, res) => {

})

export default adminRouter;