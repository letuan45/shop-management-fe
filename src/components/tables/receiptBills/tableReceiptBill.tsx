import { IReceiptBill } from "@/interfaces/receipt";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";

interface Props {
  tableData: IReceiptBill[];
  onSpectingReceiptBill: (billId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenSpectingReceiptBill?: (billId: number) => void;
  }
}

const TableReceiptBill = (props: Props) => {
  return (
    <div>
      <DataTable
        onSpectingReceiptBill={(billId: number) => {
          props.onSpectingReceiptBill(billId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableReceiptBill;
