"use client"
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import userRegister from '@/libs/userRegister';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const router = useRouter();
    const urlParams = useSearchParams();
    const callbackUrl = urlParams.get("callbackUrl") || "/myreservation";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await signIn("credentials", { email: email, password: password })
        } catch (error) {
            alert("Invalid login. Please try again.")
        }
        

        router.push(callbackUrl);
    };

    if (session) {
        router.push(callbackUrl);
        return null;
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};