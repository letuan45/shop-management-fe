import { IEmployee } from "@/interfaces/employee";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

interface Props {
  tableData: IEmployee[];
}

const TableEmployee = (props: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={props.tableData} />
    </div>
  );
};

export default TableEmployee;
