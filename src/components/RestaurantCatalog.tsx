import Link from "next/link";
import Card from "./Card";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default async function RestaurantCatalog({restaurantsJson}: {restaurantsJson: Promise<RestaurantJson>}) {
    const restaurantJsonReady = await restaurantsJson;
  
    return (
        <>
            Explore {restaurantJsonReady.count} restaurants in our catalog
            <div style={{margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around"}}>
            {
                restaurantJsonReady.data.map((restaurantItem: RestaurantItem) => (
                    <Link href={`/restaurant/${restaurantItem.id}`} className="w-1/5">
                        <Card restaurantName={restaurantItem.name} imgSrc={restaurantItem.picture}/>
                    </Link>
                ))
            }
            </div>
        </>
    )
  }
  