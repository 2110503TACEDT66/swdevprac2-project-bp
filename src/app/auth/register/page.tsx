"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform registration logic here using NextAuth API
        // Example: const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) });
        // Handle the response accordingly

        // Redirect to the desired page after successful registration
        router.push('/dashboard');
    };

    if (session) {
        // If the user is already authenticated, redirect to the dashboard
        router.push('/dashboard');
        return null;
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};