import type { Response } from "express";

export const successResponse = (res: Response, data: any, message: string) => {
    return res.status(200).json({
        success: true,
        message,
        data
    })
}

export function errorResponse(res: Response, message: string, statusCode: number) {
    return res.status(statusCode).json({
        success: false,
        message
    })
}