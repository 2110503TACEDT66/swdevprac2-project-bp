"use client";
import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/reserveSlice";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Select, MenuItem, TextField } from "@mui/material";

export default function ReservationEdit({
    params,
    restaurantId,
    apptDate,
}: {
    params: { reservation_ID: string };
    restaurantId: string;
    apptDate: string;
}) {
    const [restaurant, setRestaurant] = useState<string>("");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

    const { data: session } = useSession();
    const token = `${session?.user.token}`;

    const editReservation = async () => {
        console.log(params.reservation_ID);
        if (reserveDate && restaurant) {
            const res = await fetch(
                `https://presentation-day-1-bp-pearl.vercel.app/api/v1/reservations/${params.reservation_ID}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        apptDate: reserveDate.toDate(),
                        restaurant: restaurant,
                    }),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to update reservation");
            }
            console.log("Reservation updated");
        }
    };

    return (
        <main className="justify-center items-center min-h-screen">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="text-xl font-medium mb-6">
                    Edit Restaurant Reservation
                </div>

                <form action={() => editReservation()}>
                    <div className="mb-4">
                        <Select
                            variant="standard"
                            id="restaurant"
                            label="restaurant"
                            fullWidth
                            className="w-full"
                            value={restaurant}
                            onChange={(event) => {
                                setRestaurant(event.target.value);
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Choose Restaurant</em>
                            </MenuItem>
                            <MenuItem value="65e481c436609831cbcf660d">
                                The Botanist's Table
                            </MenuItem>
                            <MenuItem value="65e481c436609831cbcf65fa">
                                Brick & Brew
                            </MenuItem>
                            <MenuItem value="65e481c436609831cbcf6613">
                                Metropolitan Skylight
                            </MenuItem>
                        </Select>
                    </div>
                    <DateReserve
                        onDateChange={(value: Dayjs) => {
                            setReserveDate(value);
                        }}
                    />
                    <div className="text-center mt-6">
                        <button
                            name="Reserve Restaurant"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Reserve
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
