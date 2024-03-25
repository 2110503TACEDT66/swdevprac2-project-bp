"use client"

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({onDateChange}: {onDateChange:Function}) {
    const [reservationDate, setReservationDate] = useState<Dayjs|null>(null);
    
    return (
        <div className="flex flex-col space-y-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="bg-white"
                        value={reservationDate}
                        onChange={(value) => {
                            setReservationDate(value);
                            onDateChange(value);
                        }}
                    />
                </LocalizationProvider>
        </div>
    );
}