import { z } from 'zod';

export const createChatBot = z.object({
    body: z
        .object({
            name: z.string({
                required_error: 'Name is required',
            }),
            description: z.string({
                required_error: 'Description is required',
            }),
        })
        .strict(),
});

export const id = z.object({
    params: z.object({
        id: z
            .string({
                required_error: 'User id is required',
            })
            .transform(val => parseInt(val)),
    }),
});

export const updateChatBot = z.object({
    body: z
        .object({
            name: z
                .string({
                    required_error: 'Name is required',
                })
                .optional(),
            description: z
                .string({
                    required_error: 'Description is required',
                })
                .optional(),
        })
        .strict(),
    params: z.object({
        id: z
            .string({
                required_error: 'User id is required',
            })
            .transform(val => parseInt(val)),
    }),
});
