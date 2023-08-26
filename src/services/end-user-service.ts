import { Op } from 'sequelize';
import { z } from 'zod';
import { EndUser } from '../models';
import { ErrorResponse } from '../utils';
import { Pagination, endUserValidation } from '../validations';

type UserBody = z.infer<typeof endUserValidation.updateProfile>;

export const getAllEndUsers = async (pagination: Pagination) => {
    const { p, l, q } = pagination;
    const endUsers = await EndUser.findAndCountAll({
        attributes: ['id', 'name', 'email'],
        limit: l,
        offset: (p - 1) * l,
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${q}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${q}%`,
                    },
                },
            ],
        },
    });

    return {
        ok: true,
        data: {
            endUsers: endUsers.rows,
            page: p,
            limit: l,
            total: endUsers.count,
            totalPages: Math.ceil(endUsers.count / l),
        },
    };
};

export const getEndUserById = async (id: number) => {
    const endUser = await EndUser.findByPk(id, {
        attributes: ['id', 'name', 'email'],
    });
    if (!endUser) {
        throw new ErrorResponse('EndUser not found', 404);
    }
    return { ok: true, endUser };
};

export const updateProfile = async (id: number, body: UserBody['body']) => {
    const endUser = await EndUser.findByPk(id, {
        attributes: ['id', 'name', 'email'],
    });

    if (!endUser) {
        throw new ErrorResponse('EndUser not found', 404);
    }

    const updatedEndUser = await endUser.update(body);

    return { ok: true, endUser: updatedEndUser };
};

export const deleteEndUser = async (id: number) => {
    const endUser = await EndUser.findByPk(id);
    if (!endUser) {
        throw new ErrorResponse('EndUser not found', 404);
    }
    await endUser.destroy();
    return { ok: true, message: 'User deleted successfully' };
};
