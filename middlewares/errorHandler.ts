import type { Request, Response, NextFunction } from 'express';
import colors from "colors";
import { errorResponse } from '../utils/responses';

export function errorHandler(
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    console.error(colors.red(err.message));
    errorResponse(res, err.message, 500);
}