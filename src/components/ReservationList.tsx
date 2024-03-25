
import { removeReservation } from "@/redux/features/reserveSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { ReservationItem, ReservationJson } from "../../interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ReservationList ({token}:{token:string}) {
    const router = useRouter();
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

    const [ reservationJson, setReservationJson ] = useState<ReservationJson>({count: 0, data: []});

    const fetchReservations = async () => {
        if (!token) {
            console.log("Token not available");
            return;
        }

        const res = await fetch(
            "https://presentation-day-1-bp-pearl.vercel.app/api/v1/reservations",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data: ReservationJson = await res.json();
        console.log(data);
        setReservationJson(data);
    }

    const deleteReservation = async (id:string) => {
        if (!confirm("Are you sure you want to delete this reservation?")) return;
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
        alert("Reservation deleted");
        await fetchReservations();
    }

    useEffect(() => {
        fetchReservations();
    }, [])

    if (reservationJson.count == 0)
        return (
            <div className="text-xl text-center mx-5 my-2">
                No Restaurant Reservation
            </div>
        );


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
                        Appointment Date: {(new Date(reservationItem.apptDate)).toLocaleDateString("en-US")}
                    </div>{" "}
                    {/* Accessing the 'name' property */}
                    <div className="text-md">
                        Created At: {(new Date(reservationItem.createdAt)).toUTCString()}
                    </div>
                    <div className="flex flex-row space-x-3">
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
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                text-white shadow-sm"
                            onClick={() => {
                                router.push(
                                    `/reservation/${reservationItem._id}/edit`
                                );
                            }}
                        >
                            Edit Reservation
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
        
}