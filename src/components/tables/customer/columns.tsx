import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ICustomer } from "@/interfaces/customer";

export const columns: ColumnDef<ICustomer>[] = [
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              Tra cứu giao dịch
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                table.options.meta?.onOpenEditCustomer &&
                  table.options.meta?.onOpenEditCustomer(customer.id);
              }}
            >
              Sửa thông tin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
