import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image";

export default async function RestaurantDetailPage( {params}: { params: {hid: string} } ) {
  // TODO: Uncomment this
  // const restaurantJson = await getRestaurant(params.hid)
  // const restaurantData = restaurantJson.data

  // Mock Data for Demonstration Only
  // T-40 Comment this
  const mockRestaurantRepo = new Map();
  mockRestaurantRepo.set("65e481c436609831cbcf660d", {
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
  });
  mockRestaurantRepo.set("65e481c436609831cbcf65fa", {
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
  });
  mockRestaurantRepo.set("65e481c436609831cbcf6613", {
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
  });

  const restaurantData = mockRestaurantRepo.get(params.hid);
  
  return (
    <main className="text-center p-5">
        <div className="flex flex-row my-5">
          <Image src={ restaurantData.picture } // TODO: Add image (restaurantData.picture)
          alt="Restaurant Image" width={0} height={0}
          sizes="100vw" className="rounded-lg w-[30%]"/>
          <div className="text-md mx-5 text-left">
            <div className="text-md mx-5">{ restaurantData.name }</div>
            <div className="text-md mx-5">{ restaurantData.address }</div>
            <div className="text-md mx-5">{ restaurantData.district }</div>
            <div className="text-md mx-5">{ restaurantData.province }</div>
            <div className="text-md mx-5">{ restaurantData.postalcode }</div>
            <div className="text-md mx-5">{ restaurantData.tel }</div>
            <div className="text-md mx-5">{ restaurantData.region }</div>
          </div>
        </div>
    </main>
  )
}

// export async function generateStaticParams() {
//   return [{hid: "001"}, {hid: "002"}, {hid: "003"}];
// }