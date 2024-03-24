import CardPanel from "@/components/CardPanel";
import RestaurantCatalog from "@/components/RestaurantCatalog";
import getRestaurants from "@/libs/getRestaurants";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { RestaurantJson } from "../../../../interface";

export default async function Restaurant() {
  // const restaurants = getRestaurants();

  // Mock Data for Demonstration Only
  // T-43 Comment this
  const mockRestaurantData = {
    success: true,
    count: 3,
    pagination: {},
    data: [
      {
        _id: "65e481c436609831cbcf660d",
        ลำดับ: 94,
        name: "The Botanist's Table",
        address: "888 ถนนเพชรเกษม",
        district: "บางขุนเทียน",
        province: "กรุงเทพมหานคร",
        postalcode: "10150",
        tel: "02-4567890",
        region: "กรุงเทพมหานคร (Bangkok)",
        reservations: [],
        id: "65e481c436609831cbcf660d",
        picture:
          "https://img.freepik.com/premium-photo/cafe-with-large-window-table-with-chairs_728472-653.jpg",
      },
      {
        _id: "65e481c436609831cbcf65fa",
        ลำดับ: 75,
        name: "Brick & Brew",
        address: "999 ถนนรามคำแหง",
        district: "บางกะปิ",
        province: "กรุงเทพมหานคร",
        postalcode: "10240",
        tel: "02-5678901",
        region: "กรุงเทพมหานคร (Bangkok)",
        reservations: [],
        id: "65e481c436609831cbcf65fa",
        picture:
          "https://www.shutterstock.com/image-photo/3d-render-cafe-bar-restaurant-600nw-1415138246.jpg",
      },
      {
        _id: "65e481c436609831cbcf6613",
        ลำดับ: 100,
        name: "Metropolitan Skylight",
        address: "555 ถนนลาดพร้าว",
        district: "จตุจักร",
        province: "กรุงเทพมหานคร",
        postalcode: "10900",
        tel: "02-0123456",
        region: "กรุงเทพมหานคร (Bangkok)",
        reservations: [],
        id: "65e481c436609831cbcf6613",
        picture:
          "https://www.so-bangkok.com/wp-content/uploads/sites/47/2023/04/1-4-DSC_8378.jpg",
      },
    ],
  };
  const restaurants: Promise<RestaurantJson> = new Promise((resolve, reject)=>{resolve(mockRestaurantData)})

  return (
    <main className="text-center p-5">
        <h1 className="text-xl font-medium">
            Restaurants
        </h1>
        <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
          <RestaurantCatalog restaurantsJson={restaurants}/>
        </Suspense>
    </main>
  )
}
