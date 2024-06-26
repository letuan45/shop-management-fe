import { IReceiptOrder } from "@/interfaces/receipt";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";

interface Props {
  tableData: IReceiptOrder[];
  onSpectingReceiptOrder: (orderId: number) => void;
  onUpdateReceiptOrder: (orderId: number) => void;
  onMakeBill: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenSpectingReceiptOrder?: (orderId: number) => void;
    onOpenUpdateReceiptOrder?: (orderId: number) => void;
    onOpenMakeBill?: (orderId: number) => void;
    onOpenCancelOrder?: (orderId: number) => void;
  }
}

const TableReceiptOrder = (props: Props) => {
  return (
    <div>
      <DataTable
        onCancelOrder={(orderId: number) => {
          props.onCancelOrder(orderId);
        }}
        onMakeBill={(orderId: number) => {
          props.onMakeBill(orderId);
        }}
        onSpectingOrder={(orderId: number) => {
          props.onSpectingReceiptOrder(orderId);
        }}
        onUpdateOrder={(orderId: number) => {
          props.onUpdateReceiptOrder(orderId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableReceiptOrder;
