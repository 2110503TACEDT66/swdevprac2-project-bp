"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/reserveSlice";
import { ReservationItem } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function Reservation() {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [citizenId, setCitizenId] = useState<string>("");
  const [restaurant, setRestaurant] = useState<string>("Chula");
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

  const makeReservation = () => {
    if (name && lastName && citizenId && restaurant && reserveDate) {
      const item: ReservationItem = {
        name: name,
        surname: lastName,
        id: citizenId,
        restaurant: restaurant,
        reserveDate: dayjs(reserveDate).format("YYYY/MM/DD"),
      };
      dispatch(addReservation(item));
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-xl font-medium mb-6">Restaurant Reservation</div>

        <form>
          <div className="mb-4">
            <TextField
              name="Name"
              label="Name"
              variant="standard"
              fullWidth
              className="w-full"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              name="Lastname"
              label="Lastname"
              variant="standard"
              fullWidth
              className="w-full"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              name="Citizen ID"
              label="Citizen ID"
              variant="standard"
              fullWidth
              className="w-full"
              value={citizenId}
              onChange={(event) => {
                setCitizenId(event.target.value);
              }}
            />
          </div>
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
              <MenuItem value="Chula">Chulalongkorn Restaurant</MenuItem>
              <MenuItem value="Rajavithi">Rajavithi Restaurant</MenuItem>
              <MenuItem value="Thammasat">
                Thammasat University Restaurant
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
              onClick={makeReservation}
            >
              Reserve Restaurant
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}