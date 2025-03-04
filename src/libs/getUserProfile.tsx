import { UserJson } from "../../interface";

const fetch = require('node-fetch');

export default async function getUserProfile(token: string): Promise<UserJson> {
    const response = await fetch("https://presentation-day-1-bp-pearl.vercel.app/api/v1/auth/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    
    if (!response.ok) {
        throw new Error("Cannot get user profile");
    }
    return await response.json();
}
