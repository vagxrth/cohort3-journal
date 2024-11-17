import express from 'express'

const app = express();

app.use(express.json())

var user = [{
    name: "Vagarth",
    kidneys: [{
        healthy: false
    }, {
        healthy: true,
    }]
}]

app.get("/", (req, res) => {
    const healthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === true)
    res.send({
        "Number of Kidneys": user[0].kidneys.length,
        "Healthy Kidneys": healthyKidneys.length,
        "Unhealthy Kidneys":  user[0].kidneys.length - healthyKidneys.length
    });
})

app.post("/", (req, res) => {
    const kidneyHealth = req.body.healthy;
    user[0].kidneys.push({
        healthy: kidneyHealth
    });
    const healthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === true)
    res.send({
        "Number of Kidneys": user[0].kidneys.length,
        "Healthy Kidneys": healthyKidneys.length,
        "Unhealthy Kidneys":  user[0].kidneys.length - healthyKidneys.length
    });
})

app.put("/", (req, res) => {
    const unhealthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === false);
    if (unhealthyKidneys.length === 0) {
        res.status(411).json({
            "message": "All Kidneys are healthy!"
        })
    } 
    user[0].kidneys.forEach(kidney => kidney.healthy = true);
    const healthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === true)
    res.send({
        "Number of Kidneys": user[0].kidneys.length,
        "Healthy Kidneys": healthyKidneys.length,
        "Unhealthy Kidneys":  user[0].kidneys.length - healthyKidneys.length
    });
})

app.delete("/", (req, res) => {
    const unhealthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === false);
    if (unhealthyKidneys.length === 0) {
        res.status(411).json({
            "message": "No Unhealthy Kidney"
        })
    }
    user[0].kidneys = user[0].kidneys.filter(kidney => kidney.healthy === true);
    const healthyKidneys = user[0].kidneys.filter(kidney => kidney.healthy === true)
    res.json({
        "Number of Kidneys": user[0].kidneys.length,
        "Healthy Kidneys": healthyKidneys.length,
        "Unhealthy Kidneys":  user[0].kidneys.length - healthyKidneys.length
    });
})

app.listen(3000);