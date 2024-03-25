import { RestaurantJson } from "../../interface";

const fetch = require('node-fetch');

export default async function getRestaurants(page: number = 1): Promise<RestaurantJson> {

    const response = await fetch(`https://presentation-day-1-bp-pearl.vercel.app/api/v1/restaurants?page=${page}`);

    if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
    }

    return await response.json();
}
