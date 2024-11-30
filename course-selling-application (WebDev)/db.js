import mongoose  from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    password: String

})

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    password: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creator: { type: ObjectId, ref: 'admin'}
})

const purchaseSchema = new Schema({
    course: { type: ObjectId, ref: 'course'},
    user: { type: ObjectId, ref: 'user'}
})

export const userModel = mongoose.model('user', userSchema);
export const adminModel = mongoose.model('admin', adminSchema);
export const courseModel = mongoose.model('course', courseSchema);
export const purchaseModel = mongoose.model('purchase', purchaseSchema);