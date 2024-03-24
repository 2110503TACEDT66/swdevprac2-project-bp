const fetch = require('node-fetch');

export default async function getRestaurants() {

    const response = await fetch("https://presentation-day-1-bp-pearl.vercel.app/api/v1/restaurants");

    if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
    }

    return await response.json();
}
