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
  /*const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [citizenId, setCitizenId] = useState<string>("");
  const [restaurant, setRestaurant] = useState<string>("Botanist");
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
    <main className="justify-center items-center min-h-screen">
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
              <MenuItem value="Botanist">The Botanist's Table</MenuItem>
              <MenuItem value="Brick">Brick & Brew</MenuItem>
              <MenuItem value="Skylight">Metropolitan Skylight</MenuItem>
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
  */
 const [restaurant, setRestaurant] = useState<string>(
     ""
 );
 const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

 const { data: session } = useSession();
 const token =`${session?.user.token}`
 const makeReservation = async(restaurantId:string) => {
  if (reserveDate && restaurantId) {
    console.log(token, restaurantId);
    try {
      await reserveRestaurant(token, restaurantId, reserveDate);
      alert("Reservation created");
    } catch (error) {
      alert(error.message || "Failed to create reservation");
    }
  }
 }
 return (
     <main className="justify-center items-center min-h-screen">
         <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
             <div className="text-xl font-medium mb-6">
                 Restaurant Reservation
             </div>

             <form action={() => makeReservation(restaurant)}>
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
                         <MenuItem value="660145646b8f32166dd6ef88">
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
                         Reserve Restaurant
                     </button>
                 </div>
             </form>
         </div>
     </main>
 );
}