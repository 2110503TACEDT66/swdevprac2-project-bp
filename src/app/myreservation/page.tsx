'use client'
import React, { useEffect, useState } from "react";
import ReservationList from "@/components/ReservationList";
import { ReservationJson } from "../../../interface";
import { useSession } from "next-auth/react";

export default function CartPage() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<ReservationJson>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchReservations = async () => {
            setIsLoading(true);
            if (!session?.user?.token) {
                setIsLoading(false);
                console.log("Token not available");
                return;
            }

            const res = await fetch(
                "https://presentation-day-1-bp-pearl.vercel.app/api/v1/reservations",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            );

            const data: ReservationJson = await res.json();
            console.log(data);
            setReservations(data);
            setIsLoading(false);
        };

        fetchReservations();
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : reservations ? (
                <ReservationList
                    token={`${session?.user.token}`}
                />
            ) : (
                <p>pls login</p>
            )}{" "}
        </>
    );
}
//{reservations && <ReservationList reservationJson={reservations} />}