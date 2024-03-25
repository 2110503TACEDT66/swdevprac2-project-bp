import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image";

export default async function RestaurantDetailPage( {params}: { params: {rid: string} } ) {
  // TODO: Uncomment this
  const restaurantJson = await getRestaurant(params.rid)
  const restaurantData = restaurantJson.data
  
  return (
    <main className="text-center p-5 mt-7">
      <div className="flex flex-row my-5 items-center">
        <Image
          src={restaurantData.picture}
          alt="Restaurant Image"
          width={500} 
          height={300} 
          sizes="(max-width: 640px) 100vw, 50vw"
          className="rounded-lg w-full md:w-[30%] object-cover"
        />
        <div className="text-md mx-5 text-left">
          <h2 className="text-lg font-bold">{restaurantData.name}</h2>
          <p>{restaurantData.address}</p>
          <p>{restaurantData.district}</p>
          <p>{restaurantData.province}</p>
          <p>{restaurantData.postalcode}</p>
          <p>{restaurantData.tel}</p>
          <p>{restaurantData.region}</p>
        </div>
      </div>
    </main>
  );
}