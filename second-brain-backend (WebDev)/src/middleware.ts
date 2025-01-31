import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;

    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const user = jwt.verify(token as string, process.env.JWT_SECRET)

    if (user) {
        // @ts-ignore
        req.userId = user.id
        next();
    } else {
        res.status(403).json({
            message: 'User Authentication Failed!'
        })
    }

}

export default auth