import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const token = req.headers.token;

    const user = jwt.verify(token, process.env.USER_JWT_SECRET);

    if (user) {
        req.userId = user.id;
        next();
    } else {
        res.json({
            message: "You are not signed in!"
        })
    }
}

export default userAuth;