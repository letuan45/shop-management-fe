import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { ICustomer } from "@/interfaces/customer";
import { chooseColumns } from "./chooseColumns";

interface Props {
  tableData: ICustomer[];
  onEditCustomer?: (customerId: number) => void;
  isForChoose?: boolean;
  onChooseCustomer?: (customerId: number, customerName: string) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenEditCustomer?: (customerId: number) => void;
    onChooseCustomer?: (customerId: number, customerName: string) => void;
  }
}

const TableCustomer = (props: Props) => {
  return (
    <div>
      <DataTable
        onEditCustomer={(supplierId: number) => {
          props.onEditCustomer && props.onEditCustomer(supplierId);
        }}
        onChooseCustomer={(customerId: number, customerName: string) => {
          props.onChooseCustomer &&
            props.onChooseCustomer(customerId, customerName);
        }}
        columns={props.isForChoose ? chooseColumns : columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableCustomer;
