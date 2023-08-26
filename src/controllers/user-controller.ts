import { Request, Response } from 'express';
import { userService } from '../services';
import { getUser, zParse } from '../utils';
import { pagination, userValidation } from '../validations';

export const getAllUsers = async (req: Request, res: Response) => {
    const parse = await zParse(pagination, req);
    return res.status(200).json(await userService.getAllUsers(parse.query));
};

export const getUserById = async (req: Request, res: Response) => {
    const parse = await zParse(userValidation.getUserById, req);
    return res.status(200).json(await userService.getUserById(parse.params.id));
};

export const updateProfile = async (req: Request, res: Response) => {
    const parse = await zParse(userValidation.updateProfile, req);
    const user = getUser(req);

    return res
        .status(200)
        .json(await userService.updateProfile(user.id, parse.body));
};

export const deleteMyAccount = async (req: Request, res: Response) => {
    const user = getUser(req);
    return res.status(200).json(await userService.deleteMyAccount(user.id));
};
