import Link from "next/link";
import Card from "./Card";
import { HospitalItem, HospitalJson } from "../../interface";

export default async function HospitalCatalog({hospitalsJson}: {hospitalsJson: Promise<HospitalJson>}) {
    const hospitalJsonReady = await hospitalsJson;
  
    return (
        <>
            Explore {hospitalJsonReady.count} hospitals in our catalog
            <div style={{margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around"}}>
            {
                hospitalJsonReady.data.map((hospitalItem: HospitalItem) => (
                    <Link href={`/hospital/${hospitalItem.id}`} className="w-1/5">
                        <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.picture}/>
                    </Link>
                ))
            }
            </div>
        </>
    )
  }
  