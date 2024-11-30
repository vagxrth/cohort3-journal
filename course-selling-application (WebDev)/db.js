import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    _id: ObjectId,
    name: String,
    email: String,
    password: String

})

const UserModel = mongoose.model('User', userSchema);