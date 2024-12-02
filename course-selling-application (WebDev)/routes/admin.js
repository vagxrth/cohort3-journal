import express, { response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { AdminModel, CourseModel } from "../db.js";
import jwt from "jsonwebtoken";
import adminAuth from "../middlewares/admin.js"

const adminRouter = express.Router();


//signup
adminRouter.post('/signup', async (req, res) => {

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
adminRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await AdminModel.findOne({
        email: email
    })

    if (!admin) {
        return res.status(400).json({
            message: "The Admin doesn't exist!"
        })
    }

    const validAdmin = await bcrypt.compare(password, admin.password);

    if (validAdmin) {
        const token = jwt.sign({
            id: admin._id
        }, process.env.ADMIN_JWT_SECRET)
        res.json({
            token
        })
    } else {
        return res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

adminRouter.get('/list', (req, res) => {

})


//create a course
adminRouter.post('/create', adminAuth, async (req, res) => {
    const adminId = req.adminId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageURL = req.body.imageURL;

    const createCourse = await CourseModel.create({
        title,
        description,
        price,
        imageURL,
        creator: adminId
    });

    if (createCourse) {
        res.json({
            message: "A New Course has been added!"
        })
    } else {
        res.status(400).json({
            message: 'Error creating the course'
        })
    }
})


// update course details
adminRouter.put('/update', adminAuth, async (req, res) => {
    const adminId = req.adminId;
    const courseId = req.body.courseId;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageURL = req.body.imageURL;

    const updateCourse = await CourseModel.updateOne({
        _id: courseId,
        creator: adminId
    }, {
        $set: {
            title,
            description,
            price,
            imageURL
        }
    });

    if (updateCourse) {
        res.json({
            message: "The course has been updated"
        })
    } else {
        res.status(400).json({
            message: "Error updating the course"
        })
    }

})

adminRouter.delete('/delete', async(req, res) => {
    const adminId = req.adminId;
    const courseId = req.body.courseId;

    const deleteCourse = await CourseModel.deleteOne({
        _id: courseId,
        creator: adminId
    });

    if (deleteCourse) {
        res.json({
            message: 'The course has been deleted'
        })
    } else {
        res.json({
            message: 'Error deleting the course'
        })
    }
})

export default adminRouter;