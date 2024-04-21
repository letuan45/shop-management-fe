import { IEmployee } from "./employee";
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

export interface IReceiptOrderTransferItem {
  productId: number;
  quantity: number;
}

export interface IReceiptOrderTransfer {
  supplierId: number;
  receiptOrderItems: IReceiptOrderTransferItem[];
}
