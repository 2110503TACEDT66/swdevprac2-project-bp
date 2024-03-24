const fetch = require('node-fetch');

export default async function userRegister(name: string, tel: string, userEmail: string, userPassword: string) {
    const response = await fetch("https://presentation-day-1-bp-pearl.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            tel: tel,
            email: userEmail,
            password: userPassword,
            role: "user",
        }),
    })
    
    if (!response.ok) {
        throw new Error("Failed to log-in");
    }
    return await response.json();
}
