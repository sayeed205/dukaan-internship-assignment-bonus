import { z } from 'zod';

const signupSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'Invalid email address',
            required_error: "'email' is required",
        })
        .email(),
    password: z
        .string({
            required_error: "'password' is required",
        })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "'password' must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        ),
    name: z
        .string({
            required_error: "'name' is required",
        })
        .min(2)
        .max(100),
});

const loginSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'Invalid email address',
            required_error: "'email' is required",
        })
        .email(),
    password: z
        .string({
            required_error: "'password' is required",
        })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "'password' must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        ),
});

export const signup = z.object({
    body: signupSchema.strict(),
});

export const login = z.object({
    body: loginSchema.strict(),
});

export type Signup = z.infer<typeof signupSchema>;
export type Login = z.infer<typeof loginSchema>;
