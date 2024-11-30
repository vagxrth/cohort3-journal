import mongoose  from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    _id: ObjectId,
    name: String,
    email: { type: String, unique: true},
    password: String

})

const adminSchema = new Schema({
    _id: ObjectId,
    name: String,
    email: { type: String, unique: true},
    password: String
})

export const UserModel = mongoose.model('user', userSchema);
export const AdminModel = mongoose.model('admin', adminSchema);