import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { ISupplier } from "@/interfaces/supplier";

interface Props {
  tableData: ISupplier[];
  onEditSupplier: (supplierId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenEditSupplier?: (supplierId: number) => void;
  }
}

const TableSupplier = (props: Props) => {
  return (
    <div>
      <DataTable
        onEditSupplier={(supplierId: number) => {
          props.onEditSupplier(supplierId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableSupplier;
