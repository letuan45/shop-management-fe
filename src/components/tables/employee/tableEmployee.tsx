import { IEmployee } from "@/interfaces/employee";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { RowData } from "@tanstack/react-table";

interface Props {
  tableData: IEmployee[];
  onEditEmployee: (emlpoyeeId: number) => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onOpenEditEmployee?: (employeeId: number) => void;
  }
}

const TableEmployee = (props: Props) => {
  return (
    <div>
      <DataTable
        onEditEmployee={(emlpoyeeId: number) => {
          props.onEditEmployee(emlpoyeeId);
        }}
        columns={columns}
        data={props.tableData}
      />
    </div>
  );
};

export default TableEmployee;
