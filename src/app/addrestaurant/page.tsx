"use client"
import addRestaurant from "@/libs/addRestaurant";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddRestaurant() {
    const {data: session, status} = useSession()

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [tel, setTel] = useState("");
    const [region, setRegion] = useState("");

    async function sendForm() {
        try {
            await addRestaurant(
                session?.user.token,
                name,
                address,
                district,
                province,
                postalcode,
                tel,
                region
            )
            alert("Restaurant added")
        } catch (error) {
            alert("Restaurant not added. The restaurant may already exist, or you may not have the correct permissions to add a restaurant")
        }
    }


    return (
        <div className="p-5 flex flex-col items-center gap-5">
            <h1 className="text-xl">Add New Restaurant</h1>
            <form action={sendForm} className="flex flex-col w-[40%] gap-2">
                <TextField id="name" label="Name" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} required/>
                <TextField id="address" label="Address" placeholder="Address" value={address} onChange={(e) => {setAddress(e.target.value)}} required/>
                <TextField id="district" label="District" placeholder="District" value={district} onChange={(e) => {setDistrict(e.target.value)}} required/>
                <TextField id="province" label="Province" placeholder="Province" value={province} onChange={(e) => {setProvince(e.target.value)}} required/>
                <TextField id="postalcode" label="Postal Code" placeholder="Postal Code" value={postalcode} onChange={(e) => {setPostalcode(e.target.value)}} required/>
                <TextField id="tel" label="Telephone" placeholder="Telephone" value={tel} onChange={(e) => {setTel(e.target.value)}} required/>
                <TextField id="region" label="Region" placeholder="Region" value={region} onChange={(e) => {setRegion(e.target.value)}} required/>

                <button type="submit" className="px-5 py-2 bg-red-600 rounded-lg">Submit</button>
            </form>
        </div>
    )
}
