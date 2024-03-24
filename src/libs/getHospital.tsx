const fetch = require('node-fetch');

export default async function getHospital(id: string) {
    const response = await fetch(`https://vaccine-app-backend.vercel.app/api/v1/hospitals/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
    }

    return await response.json();
}
