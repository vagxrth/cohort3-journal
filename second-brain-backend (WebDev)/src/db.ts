import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    if (!process.env.CONNECTION_STRING) {
        throw new Error('CONNECTION_STRING environment variable is not defined');
    }
    await mongoose.connect(process.env.CONNECTION_STRING);
}
connectDB().catch(err => console.error('Failed to connect to MongoDB:', err));

const contentTypes = ['image', 'video', 'text', 'link', 'audio']

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true},
    title: { type: String, required: true },
    tags: [{ type: ObjectId, ref: 'tags'}],
    userId: {type: ObjectId, ref: 'users', required: true}
})

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'users', required: true}
})

export const UserModel = mongoose.model('users', userSchema);
export const ContentModel = mongoose.model('contents', contentSchema);
export const TagModel = mongoose.model('tags', tagSchema);
export const LinkModel = mongoose.model('links', linkSchema)