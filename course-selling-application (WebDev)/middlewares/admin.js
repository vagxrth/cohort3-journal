import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    const token = req.headers.token;

    const admin = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (admin) {
        req.userId = admin.id;
        next();
    } else {
        res.json({
            message: "You are not signed in!"
        })
    }
}

export default adminAuth;