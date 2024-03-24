export interface RestaurantItem {
  _id: string;
  ลำดับ: number;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture: string;
  reservations: Object[];
  id: string;
}

export interface RestaurantJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: RestaurantItem[];
}

export interface BookingItem {
  name: string;
  surname: string;
  id: string;
  restaurant: string;
  bookDate: string;
}
