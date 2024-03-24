"use client"
import { removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";

export default function BookingList () {
	const bookItems = useAppSelector((state)=> state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    
	return (
		<>
		{
            (bookItems.length > 0) ? bookItems.map((bookingItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
                <div className="text-xl">Name: {bookingItem.name}</div>
                <div className="text-xl">Surname: {bookingItem.surname}</div>
                <div className="text-md">Citizen ID: {bookingItem.id}</div>
                <div className="text-md">Restaurant: {bookingItem.restaurant}</div>
                <div className="text-md">Book date: {bookingItem.bookDate}</div>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                text-white shadow-sm" onClick={() => dispatch(removeBooking(bookingItem.id))}>
                    Remove Booking
                </button>
                </div>
            )) : <div className="text-xl text-center mx-5 my-2">No Vaccine Booking</div>
        }
        </>
    )
}