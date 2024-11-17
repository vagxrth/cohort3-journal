const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean,
    created: String,
    end: String
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('to-dos', Todo);

module.exports = {
    UserModel,
    TodoModel
}