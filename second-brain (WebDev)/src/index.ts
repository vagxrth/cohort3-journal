import express from 'express'
import { UserModel } from './db';
import bcrypt from 'bcrypt'
import { z } from 'zod'

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

app.post('/signin', (req, res) => {

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