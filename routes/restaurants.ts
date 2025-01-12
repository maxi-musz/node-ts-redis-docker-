import express from 'express';
import colors from "colors";
import { validate } from '../middlewares/validate';
import { Restaurant, RestaurantSchema } from '../schemas/restaurant';

const router = express.Router();

router.post("/", validate(RestaurantSchema), async(req, res) => {
    console.log(colors.yellow("This is the restaurants route"));
    
    const data = req.body as Restaurant;
    res.send(data);
    
    console.log(colors.cyan("Response sent"));
})

export default router;