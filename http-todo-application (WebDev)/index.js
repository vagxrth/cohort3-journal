//IN MEMORY TODO APP
import express from 'express';

const app = express();
app.use(express.json());

let todo = ["Code", "Coffee"];

app.get('/', (req, res) => {
    res.send(todo)
})

app.post('/', (req, res) => {
    todo.push(req.body.todo);
    res.send(todo);
})

app.delete('/', (req, res) => {
    todo = todo.filter(item => item !== req.body.todo);
    res.send(todo);
})

app.put('/', (req, res) => {
    const index = todo.indexOf(req.body.oldTodo);
    todo[index] = req.body.newTodo;
    res.send(todo);
})

app.listen(3000);