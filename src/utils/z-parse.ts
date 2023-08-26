import type { Request } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { ErrorResponse } from './error-response';

export async function zParse<T extends AnyZodObject>(
    schema: T,
    req: Request
): Promise<z.infer<T>> {
    try {
        return schema.parseAsync(req);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ErrorResponse(error.message, 400);
        }
        return new ErrorResponse(JSON.stringify(error), 500);
    }
}
