import { Request, Response } from 'express';
import { endUserService } from '../services';
import { getUser, zParse } from '../utils';
import { endUserValidation, pagination } from '../validations';

export const getAllEndUsers = async (req: Request, res: Response) => {
    const parse = await zParse(pagination, req);
    res.status(200).json(await endUserService.getAllEndUsers(parse.query));
};

export const getEndUserById = async (req: Request, res: Response) => {
    const parse = await zParse(endUserValidation.getEndUserById, req);
    res.status(200).json(await endUserService.getEndUserById(parse.params.id));
};

export const updateProfile = async (req: Request, res: Response) => {
    const parse = await zParse(endUserValidation.updateProfile, req);
    const user = getUser(req);
    res.status(200).json(
        await endUserService.updateProfile(user.id, parse.body)
    );
};

export const deleteEndUser = async (req: Request, res: Response) => {
    const user = getUser(req);
    res.status(200).json(await endUserService.deleteEndUser(user.id));
};
