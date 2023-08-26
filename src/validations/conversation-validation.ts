import { z } from 'zod';

export const createConversation = z.object({
    body: z
        .object({
            title: z
                .string({
                    required_error: "'title' is required",
                })
                .min(1)
                .max(100),
            content: z
                .string({
                    required_error: "'content' is required",
                })
                .min(3),
            chatbotId: z
                .number({
                    invalid_type_error: "'chatbotId' must be a number",
                    required_error: "'chatbotId' is required",
                })
                .int()
                .positive({
                    message: "'chatbotId' must be a positive number",
                }),
            isComplete: z.boolean().default(false),
        })
        .strict(),
});

export const id = z.object({
    params: z
        .object({
            id: z
                .string({
                    required_error: "'id' is required",
                })
                .transform(val => parseInt(val, 10)),
        })
        .strict(),
});

export const updateConversation = z.object({
    body: z
        .object({
            isComplete: z.boolean().default(false),
        })
        .strict(),
    params: z.object({
        id: z
            .string({
                required_error: "'id' is required",
            })
            .transform(val => parseInt(val, 10)),
    }),
});
