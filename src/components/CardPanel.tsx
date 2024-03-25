"use client"
import { useEffect, useReducer, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import getRestaurants from "@/libs/getRestaurants";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default function CardPanel() {
    const [restaurantResponse, setRestaurantResponse] = useState<RestaurantJson|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const cars = await getRestaurants();
            setRestaurantResponse(cars);
        }
    
        fetchData();
    }, [])
    
    const compareReducer = ( compareList: Map<string, number>, action: { type: string, restaurantName: string, rating?: number } ) => {
        switch (action.type) {
            case "add": {
                return new Map( compareList.set(action.restaurantName, action.rating || 5) );
            }
            case "remove": {
                compareList.delete(action.restaurantName);
                return new Map( compareList );
            }
            default: {
                return compareList;
            }
        }
    };

    const [ compareList, dispatchCompare ] = useReducer(compareReducer, new Map<string, number>());

    // Mock Data for Demonstration Only
    // const mockRestaurantRepo = [
    //     {rid: "001", name: "Chulalongkorn Restaurant", image: "/img/chula.jpg"},
    //     {rid: "002", name: "Rajavithi Restaurant", image: "/img/rajavithi.jpg"},
    //     {rid: "003", name: "Thammasat University Restaurant", image: "/img/thammasat.jpg"},
    // ]

    if (!restaurantResponse) return (<p>Restaurant Panel is Loading</p>);

    return (
      <div>
        <div style={{margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around"}}>
        {
            restaurantResponse.data.map((restaurantItem: RestaurantItem) => (
                <Link href={`/restaurant/${restaurantItem.id}`} className="w-1/5" key={restaurantItem.id}>
                    <Card restaurantName={restaurantItem.name} imgSrc={restaurantItem.picture}
                        onCompare={(restaurant: string, rating: number) => dispatchCompare({type: "add", restaurantName: restaurant, rating: rating})}
                    />
                </Link>
            ))
        }
        </div>
      </div>
    )
  }
  