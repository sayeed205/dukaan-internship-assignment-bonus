import { z } from 'zod';

const paginationSchema = z.object({
    p: z
        .string()
        .optional()
        .default('1')
        .transform(val => parseInt(val, 10)),
    l: z
        .string()
        .optional()
        .default('10')
        .transform(val => parseInt(val, 10)),
    q: z.string().optional().default(''),
});

export const pagination = z.object({
    query: paginationSchema,
});

export type Pagination = z.infer<typeof paginationSchema>;
