const fetch = require('node-fetch');

export default async function addRestaurant(token: string, name: string, address: string, district: string, province: string, postalcode: string, tel: string, region: string) {
    const response = await fetch("https://presentation-day-1-bp-pearl.vercel.app/api/v1/restaurants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            address,
            district,
            province,
            postalcode,
            tel,
            region
        }),
    })
    
    if (!response.ok) {
        throw new Error("Failed to add restaurant");
    }
    return await response.json();
}
