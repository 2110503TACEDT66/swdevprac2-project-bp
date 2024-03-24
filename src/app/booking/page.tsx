"use client"
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function Booking() {
  const dispatch = useDispatch<AppDispatch>();
  
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [citizenId, setCitizenId] = useState<string>("");
  const [hospital, setHospital] = useState<string>("Chula");
  const [bookDate, setBookDate] = useState<Dayjs|null>(null);

  const makeBooking = () => {
    if (name && lastName && citizenId && hospital && bookDate) {
      const item: BookingItem = {
        name: name,
        surname: lastName,
        id: citizenId,
        hospital: hospital,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      }
      dispatch(addBooking(item))
    }
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">Vaccine Booking</div>
      
      <div className="w-fit space-y-2">
        <TextField variant="standard" name="Name" label="Name" className="block"
          onChange={(event) => {setName(event.target.value)}}/>
        <TextField variant="standard" name="Lastname" label="Lastname" className="block"
          onChange={(event) => {setLastName(event.target.value)}}/>
        <TextField variant="standard" name="Citizen ID" label="Citizen ID" className="block"
          onChange={(event) => {setCitizenId(event.target.value)}}/>

        <Select variant="standard" name="hospital" id="hospital"
        className="h[2em] w-[200px]" onChange={(event) => {setHospital(event.target.value as string)}}>
            <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
            <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
            <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
        </Select>

        <DateReserve onDateChange={(value: Dayjs) => {setBookDate(value)}}/>
      </div>

      <button name="Book Vaccine" className="block rounded-md bg-sky-600
      hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
      onClick={makeBooking}>
        Book Vaccine
      </button>
    </main>
  )
}
