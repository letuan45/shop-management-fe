import { IEmployee } from "./employee";
import { IProduct } from "./product";
import { ISupplier } from "./supplier";

export interface IReceiptOrder {
  id: number;
  employeeId: number;
  supplierId: number;
  status: number;
  createAt: string;
  updateAt: string;
  supplier: ISupplier;
  employee: IEmployee;
}

export interface IReceiptOrderDetail {
  id: number;
  price: number;
  quantity: number;
  product: IProduct;
}

export interface IReceiptOrderFull extends IReceiptOrder {
  ReceiptOrderDetail: IReceiptOrderDetail[];
}

export interface IReceiptBill {
  id: number;
  totalPayment: number;
  employeeId: number;
  supplierId: number;
  createAt: string;
  updateAt: string;
  supplier: ISupplier;
  employee: IEmployee;
}

export interface IReceiptBillDetail {
  id: number;
  price: number;
  quantity: number;
  product: IProduct;
}

export interface IReceiptBillFull extends IReceiptBill {
  receiptBillDetails: IReceiptBillDetail[];
}

export interface IReceiptOrderTransferItem {
  productId: number;
  quantity: number;
}

export interface IReceiptOrderTransfer {
  supplierId: number;
  receiptOrderItems: IReceiptOrderTransferItem[];
}
