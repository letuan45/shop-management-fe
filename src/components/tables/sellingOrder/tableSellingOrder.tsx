import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { ISellingOrder } from "@/interfaces/selling";

interface Props {
  tableData: ISellingOrder[];
  onSpectingSellingOrder: (orderId: number) => void;
  onUpdateSellingOrder: (orderId: number) => void;
  onMakeBill: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenSpectingSellingOrder?: (orderId: number) => void;
    onOpenUpdateSellingOrder?: (orderId: number) => void;
    onOpenMakeSellingBill?: (orderId: number) => void;
    onOpenCancelSellingOrder?: (orderId: number) => void;
  }
}

const TableSellingOrder = (props: Props) => {
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
          props.onSpectingSellingOrder(orderId);
        }}
        onUpdateOrder={(orderId: number) => {
          props.onUpdateSellingOrder(orderId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableSellingOrder;
