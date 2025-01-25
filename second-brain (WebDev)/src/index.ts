import express from 'express'
import { UserModel } from './db';
import bcrypt from 'bcrypt'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import auth from './middleware';

const app = express();

app.use(express.json())

app.post('/signup', async(req, res) => {

    const user = z.object({
        username: z.string(),
        password: z.string(),
    })

    const parsed = user.safeParse(req.body);

    if (!parsed.success) {
        res.status(411).json({
            message: "Invalid Inputs",
            error: parsed.error
        })
        return
    }

    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username,
            password: hashedPassword
        });

        res.json({
            message: 'User created successfully!'
        })
    } catch(error) {
        res.status(403).json({
            message: 'Error creating User, User already Exists!'
        })
    }
})

app.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username
    })

    if (!user || !user.password) {
        res.status(400).json({
            message: 'User not found!'
        })
        return;
    }
    // @ts-ignore
    const validUser = await bcrypt.compare(password, user.password)

    if (validUser) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({
            // @ts-ignore
            id: user._id
        }, process.env.JWT_SECRET)
        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: 'Invalid Credentials!'
        })
    }

})

app.post('/add-content', (req, res) => {
    
})

app.get('/your-content', (req, res) => {

})

app.delete('/delete-content', (req, res) => {

})

app.post('/share', (req, res) => {

})

app.get('/share/:userId', (req, res) => {
    
})

app.listen(3000);