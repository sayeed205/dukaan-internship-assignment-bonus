import { z } from 'zod';

export const getUserById = z.object({
    params: z.object({
        id: z
            .string({
                required_error: 'User id is required',
            })
            .transform(val => parseInt(val, 10)),
    }),
});

export const updateProfile = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
    }),
});
