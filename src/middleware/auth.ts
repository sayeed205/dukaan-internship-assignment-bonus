import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ErrorResponse } from '../utils';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ErrorResponse(
            `unauthorized, jwt token not found or invalid`,
            401
        );
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            throw new ErrorResponse(
                `unauthorized, jwt token not found or invalid`,
                401
            );
        }

        next();
    });
};
