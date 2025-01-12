import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.body);
            next();
        } catch (err: any) {
            res.status(400).json({
            error: "Validation failed",
            details: err.errors, // Return the validation errors to the client
            });
        }
    }
}