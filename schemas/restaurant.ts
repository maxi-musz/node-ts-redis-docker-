import { z } from 'zod';

export const RestaurantSchema = z.object({
    name: z.string().min(2),
    location: z.string().min(2),
    cuisines: z.array(z.string().min(2)),
})

export const RestaurantsDetailsSchema = z.object({
    links: z.object({
        name: z.string().min(2),
        url: z.string().min(2),
    }),
    contact: z.object({
        phone: z.string().min(2),
        email: z.string().min(2),
    }),
})

export const ReviewSchema = z.object({
    name: z.string().min(2),
    rating: z.number().int().min(1).max(5),
    review: z.string().min(2),
})

export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantDetails = z.infer<typeof RestaurantsDetailsSchema>;
export type Review = z.infer<typeof ReviewSchema>;

// export const restaurantSchema = z.object({
//     name: z.string().min(2).max(255),
//     location: z.string().min(2).max(255),
//     description: z.string().min(2).max(255),
//     address: z.string().min(2).max(255),
//     phone: z.string().min(2).max(255),
//     cuisine: z.string().min(2).max(255),
//     website: z.string().min(2).max(255),
//     image: z.string().min(2).max(255),
//     priceRange: z.number().int().min(1).max(5),
//     rating: z.number().min(1).max(5),
//     menu: z.array(z.object({
//         name: z.string().min(2).max(255),
//         price: z.number().min(1).max(1000),
//         description: z.string().min(2).max(255),
//         image: z.string().min(2).max(255),
//     }))
// })

