import { Dayjs } from "dayjs";

const fetch = require('node-fetch');

export default async function reserveRestaurant(token: string, restaurantId: string, reserveDate: Dayjs) {
    const response = await fetch(
        `https://presentation-day-1-bp-pearl.vercel.app/api/v1/restaurants/${restaurantId}/reservations/`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apptDate: reserveDate.toDate(),
            }),
        }
    );

    if (!response.ok) {
        if (response.status === 400) {
            const result = await response.json();
            throw new Error(result.message);
        }
        throw new Error("Unknown error occurred");
    }

    return await response.json();
}
