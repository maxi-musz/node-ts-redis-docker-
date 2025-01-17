import { Router, Request, Response, NextFunction } from "express";
import express from 'express';
import colors from "colors";
import { validate } from '../middlewares/validate';
import { Restaurant, RestaurantSchema, ReviewSchema, Review } from '../schemas/restaurant';
import { initializeRedisClient } from '../utils/client';
import { nanoid } from 'nanoid';
import { restaurantKeyById, reviewDetailsKeyById, reviewKeyById } from '../utils/keys';
import { successResponse } from '../utils/responses';
import { checkrestaurantExists } from "../middlewares/checkId";

const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res, next) => {
    console.log(colors.yellow("This is the restaurants route"));
  
    const data = req.body as Restaurant;
  
    try {
        const client = await initializeRedisClient(); 
        const id = nanoid();
        const restaurantKey = restaurantKeyById(id);
        const hashData = { id, name: data.name, location: data.location };
    
        // Push data to Redis
        const pushToRedis = await client.hSet(restaurantKey, hashData);
        console.log(colors.blue(`Data pushed to Redis: ${pushToRedis}`));
    
        // Send response using the `res` object
        console.log(colors.cyan("Response sent"));
        successResponse(res, hashData, "Added new restaurant to Redis");
    } catch (error) {
      console.error(error);
      next(error); // Forward the error to the global error handler
    } finally {
        console.log(colors.cyan("Response sent"));
    }
});

router.post("/:restaurantId/reviews",
  checkrestaurantExists,
  validate(ReviewSchema),
  async (req: Request<{ restaurantId: string }>, res: Response, next: NextFunction): Promise<void> => {
    console.log(colors.yellow("This is the reviews route"));
  
    const { restaurantId } = req.params;
    const data = req.body as Review;
  
    try {
      const client = await initializeRedisClient();
      const reviewId = nanoid();
      const reviewKey = reviewKeyById(reviewId);
      const reviewDetailsKey = reviewDetailsKeyById(reviewId);
      const hashData = { id: reviewId, ...data };
  
      // Push data to Redis
      const pushToRedis = await client.hSet(reviewKey, hashData);
      await client.hSet(reviewDetailsKey, { ...data, restaurantId });
  
      console.log(colors.blue(`Data pushed to Redis: ${pushToRedis}`));
  
      // Send response using the `res` object
      console.log(colors.cyan("Response sent"));
      successResponse(res, hashData, "Added new review to Redis");
    } catch (error) {
      console.error(error);
      next(error); // Forward the error to the global error handler
    }
  }
) 

router.get("/:restaurantId", 
    // checkrestaurantExists,
    checkrestaurantExists,
    async (req: Request<{ restaurantId: string }>,res: Response, next: NextFunction): Promise<void> => {
    console.log(colors.yellow("Getting restaurant by ID"));
  
    const { restaurantId } = req.params;
  
    try {
      const client = await initializeRedisClient();
      const restaurantKey = restaurantKeyById(restaurantId);
  
      // Fetch data from Redis
      const [viewCount, restaurantData] = await Promise.all([
        client.hIncrBy(restaurantKey, "viewCount", 1),
        client.hGetAll(restaurantKey),
    ]);
  
      if (Object.keys(restaurantData).length === 0) {
        console.log(colors.red(`No data found for restaurant ID: ${restaurantId}`));
        res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
  
      console.log(colors.blue(`Data fetched from Redis: ${JSON.stringify(restaurantData)}`));
  
      // Send successful response
      successResponse(res, restaurantData, "Fetched restaurant from Redis");
    } catch (error) {
      console.error(colors.red("Error fetching restaurant data:"), error);
      next(error); // Forward error to global error handler
    }
  });
  

export default router;