import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ICustomer } from "@/interfaces/customer";

export const chooseColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "name",
    header: "Tên khách hàng",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "score",
    header: "Điểm tích lũy",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row, table }) => {
      const customer = row.original;

      return (
        <Button
          variant="outline"
          onClick={() => {
            table.options.meta?.onChooseCustomer &&
              table.options.meta.onChooseCustomer(customer.id, customer.name);
          }}
        >
          Chọn
        </Button>
      );
    },
  },
];
