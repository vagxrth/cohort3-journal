import express, { response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { AdminModel } from "../db.js";
import jwt from "jsonwebtoken"

const adminRouter = express.Router();


//signup
adminRouter.post('/signup', async(req, res) => {
    
    const inputSchema = z.object({
        name: z.string().max(30),
        email: z.string().email(),
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
        const hashedPassword = await bcrypt.hash(password, 5);

        await AdminModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            message: "You are signed up!"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error Occurred!"
        })
    }
    
});


//signin
adminRouter.post('/signin', async(req, res) => {
    const email = req.body.email;
    const password = req.body.email;

    const admin = await AdminModel.find({
        email: email
    })

    if (!admin) {
        return res.status(400).json({
            message: "The Admin doesn't exist!"
        })
    }

    const validUser = bcrypt.compare(password, admin.password);

    if (!validUser) {
        return res.status(400).json({
            message: "Incorrect Credentials"
        })
    }
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