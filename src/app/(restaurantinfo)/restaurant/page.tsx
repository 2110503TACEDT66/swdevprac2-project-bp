import CardPanel from "@/components/CardPanel";
import RestaurantCatalog from "@/components/RestaurantCatalog";
import getRestaurants from "@/libs/getRestaurants";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { RestaurantJson } from "../../../../interface";

export default async function Restaurant() {
  const restaurants = getRestaurants();

  return (
    <main className="text-center p-5">
        <h1 className="text-xl font-medium">
            Restaurants
        </h1>
        <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
        </Suspense>
        <CardPanel/>
    </main>
  )
}
