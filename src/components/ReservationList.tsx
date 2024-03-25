import { removeReservation } from "@/redux/features/reserveSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ReservationItem, ReservationJson } from "../../interface";
import { useRouter } from "next/navigation";
interface ReservationListProps {
    reservationJson: ReservationJson;
    onReservationChange: () => void;
    session: any;
}
export default function ReservationList({
    reservationJson,
    onReservationChange,
    session,
}: ReservationListProps) {
    const router = useRouter();
    const token = session?.user.token;
    if (!reservationJson || reservationJson.count == 0)
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-3xl text-center text-gray-600 font-bold mb-4">
              No Restaurant Reservation
            </div>
            <div className="text-lg text-center text-gray-500">
              You haven't made any restaurant reservation yet.
            </div>
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
                    <div className="flex space-x-3 mt-1">
                        <button
                            className="block rounded-md bg-rose-500 hover:bg-red-600 px-3 py-1
                text-white shadow-sm"
                            onClick={() =>
                                deleteReservation(reservationItem._id)
                            }
                        >
                            Remove Reservation
                        </button>
                        <button
                            className="block rounded-md bg-cyan-500 hover:bg-sky-600 px-3 py-1
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
