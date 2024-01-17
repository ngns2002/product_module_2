export interface ICheck {
  id: number;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
  product_code: string;
  quantity_oder: number;
  DataUser: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
}
