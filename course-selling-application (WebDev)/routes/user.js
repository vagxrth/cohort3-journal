import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
    res.send("Hello World")
})

userRouter.post("/signin", (req, res) => {

})

userRouter.get("/courses", (req, res) => {

})

export default userRouter;