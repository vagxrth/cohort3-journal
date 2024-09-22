import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING);

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorID: { type: Schema.Types.ObjectId, ref: 'user'}
})

const purchaseSchema = new Schema({
    courseID: { type: Schema.Types.ObjectId, ref: 'course'},
    userID: { type: Schema.Types.ObjectId, ref: 'user'}
})

export const userModel = mongoose.model('user', userSchema);
export const adminModel = mongoose.model('admin', adminSchema);
export const courseModel = mongoose.model('course', courseSchema);
export const purchaseModel = mongoose.model('purchase', purchaseSchema);