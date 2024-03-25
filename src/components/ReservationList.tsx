
import { removeReservation } from "@/redux/features/reserveSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { ReservationItem, ReservationJson } from "../../interface";
import { useRouter } from "next/navigation";
interface ReservationListProps {
    reservationJson: ReservationJson;
    token: string;
    onReservationChange: () => void; // Define the prop for triggering refetch
}
export default function ReservationList({
    reservationJson,
    token,
    onReservationChange, // Receive the prop
}: ReservationListProps) {
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
    if (reservationJson.count == 0)
        return (
            <div className="text-xl text-center mx-5 my-2">
                No Restaurant Reservation
            </div>
        );

    const deleteReservation = async (id: string) => {
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
        onReservationChange();
    };

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
                        Appointment Date:{" "}
                        {new Date(reservationItem.apptDate).toLocaleDateString(
                            "en-US"
                        )}
                    </div>{" "}
                    {/* Accessing the 'name' property */}
                    <div className="text-md">
                        Created At:{" "}
                        {new Date(reservationItem.createdAt).toUTCString()}
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