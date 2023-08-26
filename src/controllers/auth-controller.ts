import { Request, Response } from 'express';
import { authService } from '../services';

export const userSignup = async (req: Request, res: Response) => {
    return res.status(201).json(await authService.userSignup(req.body));
};

export const userLogin = async (req: Request, res: Response) => {
    return res.status(200).json(await authService.userLogin(req.body));
};

export const endUserSignup = async (req: Request, res: Response) => {
    return res.status(201).json(await authService.endUserSignup(req.body));
};

export const endUserLogin = async (req: Request, res: Response) => {
    return res.status(200).json(await authService.endUserLogin(req.body));
};
