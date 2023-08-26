import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const getUser = (req: Request) => {
    const auth = req.headers.authorization!;

    const [type, token] = auth.split(' ');

    return jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        email: string;
    };
};
