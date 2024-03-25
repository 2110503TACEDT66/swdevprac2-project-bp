"use client"

import getUserProfile from "@/libs/getUserProfile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserItem } from "../../../interface";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [user, setUser] = useState<UserItem|null>(null);

    if (!session) {
        return null;
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await getUserProfile(session?.user.token);
            setUser(userResponse.data);
        }

        fetchUser();
    }, [])

    if (!user) return (<p>Loading...</p>);
    
    const createdAt = new Date(user.createdAt);

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{user.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
              <tr><td>Email</td><td>{user.email}</td></tr>
              <tr><td>Tel.</td><td>{user.tel}</td></tr>
              <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>
            {
                (user.role == "admin")
                ? <button>Add new car</button>
                : null
            }
        </main>
    )
}
