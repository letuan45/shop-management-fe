import { ICustomer } from "./customer";
import { IEmployee } from "./employee";
import { IProduct } from "./product";

export interface ISellingOrderDetail {
  id: number;
  productId: number;
  sellingOrderId: number;
  quantity: number;
  price: number;
  product: IProduct;
}

export interface ISellingOrder {
  id: number;
  employeeId: number;
  customerId: number;
  status: number;
  createAt: string;
  updateAt: string;
  customer: ICustomer;
  employee: IEmployee;
}

export interface ISellingOrderFull extends ISellingOrder {
  sellingOrderDetails: ISellingOrderDetail[];
}
