const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { z } = require("zod");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL);


const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

    const passwordSchema = z.string().min(8, { message: "Enter Minimum 8 Characters"}) // schema for password validation
    .max(20, { message: "Enter Maximum 20 Characters" })
    .refine((password) => /[A-Z]/.test(password), { message: "Enter a uppercase letter" })
    .refine((password) => /[a-z]/.test(password), { message: "Enter a lowercase letter" })
    .refine((password) => /[0-9]/.test(password), { message: "Enter a number" })
    .refine((passowrd) => /[!@#$%^&*]/.test(passowrd), { message: "Enter a special character" })

    const requiredBody = z.object({  // create a schema for the validation
        email: z.string().email(),
        password: passwordSchema,
        name: z.string().max(30)
    })

    const parsedBody = requiredBody.safeParse(req.body); // check validation of the original data

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            error: parsedBody.error
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });

        res.json({
            message: "You are signed up"
        })
    } catch (error) {
        res.status(400).json({
            message: "Email already exists"
        })
    }

});


app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    });

    if (!response) {
        res.status(403).json({
            message: "User does not exist"
        })
    }

    const validUser = await bcrypt.compare(password, response.password);

    if (validUser) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function (req, res) {

    const createdTime = new Date().toLocaleTimeString();

    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    const duration = req.body.time;

    const date = new Date();
    date.setHours(date.getHours() + duration);
    const endTime = date.toLocaleTimeString();

    await TodoModel.create({
        userId: userId,
        title: title,
        done: done,
        created: createdTime,
        end: endTime
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.post("/done", auth, async(req, res) => {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId
    })
    const markedTodo = todos.find((todo) => todo.title === req.body.todo);
    if (!markedTodo) {
        res.json({
            message: "No such Todo"
        })
    }
    await TodoModel.updateOne({ _id: markedTodo._id }, { $set: {
        done: true
    }})
    res.json({
        message: 'Todo has been updated'
    })
})

app.listen(3000);