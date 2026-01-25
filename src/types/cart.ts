export type Product = {
  id: number;
  name: string;
  price: number;
  picture: string;
  quantity: number;
};

export interface CartProps {
  [productId: string]: Product;
}
