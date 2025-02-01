import express from 'express'
import { ContentModel, LinkModel, UserModel } from './db';
import bcrypt from 'bcrypt'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import auth from './middleware';
import random from './utils';

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

app.post('/add-content', auth, async(req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    // @ts-ignore
    const userId = req.userId;

    try{
        await ContentModel.create({
            link,
            type,
            title,
            userId
            
        })
        res.status(200).json({
            message: 'Content added Successfully!'
        })
    } catch(error) {
        res.status(400).json({
            message: 'Error adding content!'
        })
    }
})

app.get('/your-content', auth, async(req, res) => {

    // @ts-ignore
    const userId = req.userId

    const content = await ContentModel.find({
        userId
    }).populate('userId', 'username')

    if (content) {
        res.status(200).json({
            content
        })
    } else {
        res.json(400).json({
            message: 'No Content Found!'
        })
    }
})

app.delete('/delete-content', auth, async(req, res) => {
    const title = req.body.title;

    try{
        await ContentModel.deleteOne({
            title,
            // @ts-ignore
            userId: req.userId
        })
        res.status(200).json({
            message: 'Content deleted successfully!'
        })
    } catch(error) {
        res.status(403).json({
            message: 'Error deleting content!'
        })
    }
})

app.post('/share', auth, async(req, res) => {
    const share = req.body.share;
    if (share) {
        try {
            await LinkModel.create({
                hash: random(10),
                // @ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                message: 'Shareable Link Generate Successfully!'
            })
        }catch(error) {
            res.status(403).json({
                message: "Error generating the Shareable Link!"
            })
        }
    } else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        })

        res.status(200).json({
            message: 'Shareable Link Disabled!'
        })
    }
})

app.get('/share/:userId', (req, res) => {
    
})

app.listen(3000);