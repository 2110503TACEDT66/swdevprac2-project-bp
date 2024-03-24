import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReservationItem } from "../../../interface"

type ReserveState = {
	reserveItems: ReservationItem[]
}

const initialState: ReserveState = { reserveItems: [] }


export const reserveSlice = createSlice({
	name: "cart",
    initialState,
	reducers: {
		addReservation: (state, action: PayloadAction<ReservationItem>) => {
            const remainItems = state.reserveItems.filter(obj => {
				return (
					(obj.id !== action.payload.id)
				);
			});
			state.reserveItems = remainItems;
			state.reserveItems.push(action.payload);
		},
		removeReservation: (state, action: PayloadAction<string>) => {
            const remainItems = state.reserveItems.filter(obj => {
				return (
					(obj.id !== action.payload)
				);
			});
			state.reserveItems = remainItems;
		}
	}
})

export const { addReservation: addReservation, removeReservation: removeReservation } = reserveSlice.actions
export default reserveSlice.reducer 