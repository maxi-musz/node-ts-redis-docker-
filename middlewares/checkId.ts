import type { Request, Response, NextFunction } from "express";
import { initializeRedisClient } from "../utils/client";
import { restaurantKeyById } from "../utils/keys";
import { errorResponse } from "../utils/responses";
import colors from "colors";

export const checkrestaurantExists = async (req: Request<{ restaurantId: string }>, res: Response, next: NextFunction): Promise<void> => {
    const { restaurantId } = req.params;

    if(!restaurantId) {
        errorResponse(res, "Restaurant ID is required", 400);
    }
    
    try {
        const client = await initializeRedisClient();
        const restaurantKey = restaurantKeyById(restaurantId);
    
        // Fetch data from Redis
        const restaurantData = await client.hGetAll(restaurantKey);
    
       const exists = await client.exists(restaurantKey);

       if(!exists) {
        console.log(colors.red(`No data found for restaurant ID: ${restaurantId}`));
        errorResponse(res, "Restaurant not found", 404);
      }
        next();
    } catch (error) {
        console.error(error);
        next(error); // Forward the error to the global error handler
    }
}