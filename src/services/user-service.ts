import { Op } from 'sequelize';

import { z } from 'zod';
import { User } from '../models';
import { ErrorResponse } from '../utils';
import { Pagination, userValidation } from '../validations';

type UserBody = z.infer<typeof userValidation.updateProfile>;

export const getAllUsers = async (pagination: Pagination) => {
    const { p, l, q } = pagination;
    const users = await User.findAndCountAll({
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
            users: users.rows,
            page: p,
            limit: l,
            total: users.count,
            totalPages: Math.ceil(users.count / l),
        },
    };
};

export const getUserById = async (id: number) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
    });
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    return { ok: true, user };
};

export const updateProfile = async (id: number, body: UserBody['body']) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
    });
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    const updatedUser = await user.update(body);
    return { ok: true, user: updatedUser };
};

export const deleteMyAccount = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }

    await user.destroy();
    return { ok: true, message: 'User deleted successfully' };
};
