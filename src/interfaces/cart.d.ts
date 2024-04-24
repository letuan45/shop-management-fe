import { IProduct } from "./product";

export interface ICartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: IProduct;
}

export interface ICart {
  id: number;
  userId: number;
  cartItems: ICartItem[];
}

export interface IAddToCart {
  productId: number;
  quantity: number;
}
