"use client"
import { useEffect, useReducer, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import getHospitals from "@/libs/getHospitals";
import { HospitalItem, HospitalJson } from "../../interface";

export default function CardPanel() {
    const [hospitalResponse, setHospitalResponse] = useState<HospitalJson|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const cars = await getHospitals();
            setHospitalResponse(cars);
        }
    
        fetchData();
    }, [])
    
    const compareReducer = ( compareList: Map<string, number>, action: { type: string, hospitalName: string, rating?: number } ) => {
        switch (action.type) {
            case "add": {
                return new Map( compareList.set(action.hospitalName, action.rating || 5) );
            }
            case "remove": {
                compareList.delete(action.hospitalName);
                return new Map( compareList );
            }
            default: {
                return compareList;
            }
        }
    };

    const [ compareList, dispatchCompare ] = useReducer(compareReducer, new Map<string, number>());

    // Mock Data for Demonstration Only
    // const mockHospitalRepo = [
    //     {hid: "001", name: "Chulalongkorn Hospital", image: "/img/chula.jpg"},
    //     {hid: "002", name: "Rajavithi Hospital", image: "/img/rajavithi.jpg"},
    //     {hid: "003", name: "Thammasat University Hospital", image: "/img/thammasat.jpg"},
    // ]

    if (!hospitalResponse) return (<p>Hospital Panel is Loading</p>);

    return (
      <div>
        <div style={{margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around"}}>
        {
            hospitalResponse.data.map((hospitalItem: HospitalItem) => (
                <Link href={`/hospital/${hospitalItem.id}`} className="w-1/5">
                    <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.picture}
                        onCompare={(hospital: string, rating: number) => dispatchCompare({type: "add", hospitalName: hospital, rating: rating})}
                    />
                </Link>
            ))
        }
        </div>
        { Array.from(compareList.keys()).map( (hospital) => <div key={hospital} data-testid={hospital}
            onClick={()=>dispatchCompare({type: "remove", hospitalName:hospital})}>
            {hospital}: {compareList.get(hospital)}</div> ) }
      </div>
    )
  }
  