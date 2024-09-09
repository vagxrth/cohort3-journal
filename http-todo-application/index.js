import express from 'express';

const app = express();

const todo = ["Code", "Coffee"];

app.get('/', (req, res) => [
    res.send(todo)
])

app.listen(3000);