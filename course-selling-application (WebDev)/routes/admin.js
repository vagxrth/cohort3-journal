import express from "express";

const adminRouter = express.Router();

adminRouter.post('/signup', (req, res) => {

});

adminRouter.post('/signin', (req, res) => {

})

adminRouter.post('/create', (req, res) => {
    res.send("ohayogozaimasu")
})

adminRouter.post('/add', (req, res) => {
    
})

adminRouter.post('/delete', (req, res) => {

})

export default adminRouter;