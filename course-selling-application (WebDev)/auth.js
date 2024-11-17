export const adminCheck = (req, res, next) => {
    const admin = req.params.admin;

    if (admin) {
        next();
    }
    else {
        res.json({
            message: "You are not an admin!"
        })
    }
}

export const userCheck = (req, res, next) => {
    const user = req.params.user;

    if (user) {
        next();
    }
    else {
        res.json({
            message: "You are not a user!"
        })
    }
}