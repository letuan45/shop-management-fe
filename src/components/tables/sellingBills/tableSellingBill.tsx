import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { ISellingBill } from "@/interfaces/selling";

interface Props {
  tableData: ISellingBill[];
  onSpectingSellingBill: (billId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenSpectingSellingBill?: (billId: number) => void;
  }
}

const TableSellingBill = (props: Props) => {
  return (
    <div>
      <DataTable
        onSpectingSellingBill={(billId: number) => {
          props.onSpectingSellingBill(billId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableSellingBill;
