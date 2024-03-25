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

export interface ReservationItem {
    _id: string;
    apptDate: string;
    user: string;
    restaurant: {
        _id: string;
        name: string;
        province: string;
        tel: string;
        id: string;
    };
    createdAt: string;
}


export interface ReservationJson {
    success: boolean;
    count: number;
    data: ReservationItem[];
}

export interface UserItem {
    _id: string;
    __v: number;
    name: string;
    email: string;
    role: string;
    tel: string;
    createdAt: string;
}


export interface UserJson {
    success: boolean;
    data: UserItem;
}
