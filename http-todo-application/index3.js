//FILESYSTEM TODO APP WITH USER LOGIC
import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const file = 'usertodo.json'

app.get('/', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.send(JSON.parse(data));
    })
})

app.get('/:userId', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const userTodo = JSON.parse(data);
        const todo = userTodo[req.params.userId];
        res.send(todo);
    })
})

app.post('/', (req, res) => {
    const { userId, todo } = req.body;
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const userTodo = JSON.parse(data);
        if (!userTodo[userId]) {
            userTodo[userId] = { todos: [] };
        }
        const user = userTodo[req.body.userId];
        user.todos.push(req.body.todo);
        fs.writeFile(file, JSON.stringify(userTodo), (err) => {
            if (err) {
                console.log(err);
            }
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.send(JSON.parse(data));
            })
        })
    })
})

app.delete('/:userId', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err); 
        }
        const userTodo = JSON.parse(data);
        const user = userTodo[req.params.userId];
        const index = user.todos.indexOf(req.body.delete);
        if (index === -1) {
            res.send("No such Todo");
        }  
        user.todos.splice(index, 1);
        fs.writeFile(file, JSON.stringify(userTodo), (err, data) => {
            if (err) {
                console.log(err);
            }
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.send(JSON.parse(data));
            })
        })
    })
})

app.put('/:userId', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const userTodo = JSON.parse(data);
        let user = userTodo[req.params.userId];
        if (!user) {
            res.send("No such User");
        }
        const index = user.todos.indexOf(req.body.old);
        if (index === -1) {
            res.send("No such Todo");
        }
        user.todos[index] = req.body.new;
        fs.writeFile(file, JSON.stringify(userTodo), (err) => {
            if (err) {
                console.log(err);
            }
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.send(JSON.parse(data));
            })
        })
    })
})

app.listen(3000);