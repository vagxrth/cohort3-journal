import express from "express";

const adminRouter = express.Router();

adminRouter.post('/signup', (req, res) => {

});

adminRouter.post('/signin', (req, res) => {

})

adminRouter.get('/list', (req, res) => {
    
})

adminRouter.post('/create', (req, res) => {
    res.send("ohayogozaimasu")
})

adminRouter.put('/add', (req, res) => {
    
})

adminRouter.delete('/delete', (req, res) => {

})

export default adminRouter;