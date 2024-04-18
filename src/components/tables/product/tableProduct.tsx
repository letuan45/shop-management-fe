import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";
import { IProduct } from "@/interfaces/product";

interface Props {
  tableData: IProduct[];
  onEditProduct: (productId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenEditProduct?: (productId: number) => void;
  }
}

const TableProduct = (props: Props) => {
  return (
    <div>
      <DataTable
        onEditProduct={(productId: number) => {
          props.onEditProduct(productId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableProduct;
