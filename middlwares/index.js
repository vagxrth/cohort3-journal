import express from 'express'

const app = express();

let requestCount = 0;

const middlewareFunction = (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Status Code: ${res.statusCode}`);
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url);
    const time = new Date().toLocaleTimeString();
    console.log(time);
    next();
}
 
const reqCount = (req, res, next) => {
    requestCount++;
    console.log(`Total number of request: ${requestCount}`);
    next();
} 

app.use(middlewareFunction);

app.get('/add/:a/:b', reqCount, (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a + b
    })
})

app.get('/subtract', reqCount, (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send((a-b).toString());
})

app.get('/multiply', reqCount, (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(String(a*b));
})

app.get('/divide', reqCount, (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(String(a/b));
})

app.get('/request', (req, res) => {
    const request = requestCount;
    res.send(`Request Count: ${requestCount}`);
})

app.listen(3000);