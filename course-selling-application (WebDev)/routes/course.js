import express from 'express';

const courseRouter = express.Router();

courseRouter.get("/catalog", (req, res) => {
    res.send("hajimemashte")
})

courseRouter.post("/buy", (req, res) => {

})

export default courseRouter;