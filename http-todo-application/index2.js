//FILESYSTEM BASED TODO APP
import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());


const file = 'todo.json'


app.get('/', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data)
        }
    })
})

app.post('/', (req, res) => {
    fs.appendFile(file, (`${req.body.add}\n`), (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            })
        }
    })
})

app.delete('/', (req, res) => {
    const data = fs.readFileSync(file, 'utf-8');
    const lines = data.split('\n');
    const item = lines.filter(line => !line.includes(req.body.delete));
    const updated = item.join('\n');
    fs.writeFile(file, updated, (err) => {
        if (err) {
            console.log(err);
        }
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
    })
})

app.put('/', (req, res) => {
    const data = fs.readFileSync(file, 'utf-8');
    const lines = data.split('\n');
    const index = lines.indexOf(req.body.old);
    lines[index] = req.body.new;
    const updated = lines.join('\n');
    fs.writeFile(file, updated, (err) => {
        if (err) {
            console.log(err);
        }
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            res.send(data);
        })
    })
})

app.listen(3000);