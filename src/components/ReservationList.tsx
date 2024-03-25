
import { removeReservation } from "@/redux/features/reserveSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { ReservationItem, ReservationJson } from "../../interface";

export default function ReservationList ({reservationJson, token}:{reservationJson:ReservationJson, token:string}) {
	/*const reserveItems = useAppSelector((state)=> state.reserveSlice.reserveItems);
    const dispatch = useDispatch<AppDispatch>();
    
	return (
		<>
		{
            (reserveItems.length > 0) ? reserveItems.map((reservationItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reservationItem.id}>
                <div className="text-xl">Name: {reservationItem.name}</div>
                <div className="text-xl">Surname: {reservationItem.surname}</div>
                <div className="text-md">Citizen ID: {reservationItem.id}</div>
                <div className="text-md">Restaurant: {reservationItem.restaurant}</div>
                <div className="text-md">Reserve date: {reservationItem.reserveDate}</div>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                text-white shadow-sm" onClick={() => dispatch(removeReservation(reservationItem.id))}>
                    Remove Reservation
                </button>
                </div>
            )) : <div className="text-xl text-center mx-5 my-2">No Restaurant Reservation</div>
        }
        </>
    )*/
    if (reservationJson.count == 0)
        return (
            <div className="text-xl text-center mx-5 my-2">
                No Restaurant Reservation
            </div>
        );

    const deleteReservation = async (id:string) => {
        const res = await fetch(
            `https://presentation-day-1-bp-pearl.vercel.app/api/v1/reservations/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error("Failed to delete reservation");
        }
        console.log("Reservation deleted");
    }
    return (
        <>
            {reservationJson.data.map((reservationItem: ReservationItem) => (
                <div
                    className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                    key={reservationItem._id}
                >
                    <div className="text-xl">
                        Restaurant: {reservationItem.restaurant?.name}
                    </div>
                    <div className="text-md">User: {reservationItem.user}</div>{" "}
                    {/* Accessing the 'name' property */}
                    <div className="text-md">
                        Appointment Date: {reservationItem.apptDate}
                    </div>{" "}
                    {/* Accessing the 'name' property */}
                    <div className="text-md">
                        Created At: {reservationItem.createdAt}
                    </div>
                    <form
                        action={() =>
                            deleteReservation(reservationItem._id)
                        }
                    >
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                text-white shadow-sm"
                        >
                            Remove Reservation
                        </button>
                    </form>
                </div>
            ))}
        </>
    );
        
}