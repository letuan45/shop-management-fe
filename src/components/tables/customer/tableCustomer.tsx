import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { ICustomer } from "@/interfaces/customer";

interface Props {
  tableData: ICustomer[];
  onEditCustomer: (customerId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenEditCustomer?: (customerId: number) => void;
  }
}

const TableCustomer = (props: Props) => {
  return (
    <div>
      <DataTable
        onEditCustomer={(supplierId: number) => {
          props.onEditCustomer(supplierId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableCustomer;
