"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/reserveSlice";
import { ReservationItem, RestaurantJson } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSession } from "next-auth/react";
import reserveRestaurant from "@/libs/reserveRestaurant";

export default function Reservation() {
    const [restaurant, setRestaurant] = useState<string>("");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

    const { data: session } = useSession();
    const token = `${session?.user.token}`;
    const makeReservation = async (restaurantId: string) => {
        if (reserveDate && restaurantId) {
            console.log(token, restaurantId);
            try {
              await reserveRestaurant(token, restaurantId, reserveDate);
              alert("Reservation created");
            } catch (error: any) {
              alert(error.message ?? "Reservation not created. The restaurant may already exist, or you may not have the correct permissions to add a restaurant");
            }
        }
    };
    return (
        <main className="justify-center items-center min-h-scree">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="text-xl font-medium mb-6 text-center">
                    Restaurant Reservation
                </div>

                <form action={() => makeReservation(restaurant)}>
                    <div className="my-4">
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
                            <MenuItem value="660145646b8f32166dd6ef88">
                                The Botanist's Table
                            </MenuItem>
                            <MenuItem value="660146156b8f32166dd6ef89">
                                Brick & Brew
                            </MenuItem>
                            <MenuItem value="6601464e6b8f32166dd6ef8a">
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Reserve Restaurant
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
