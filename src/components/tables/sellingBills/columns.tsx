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
import { dateFormat } from "@/lib/utils";
import { IEmployee } from "@/interfaces/employee";
import { ISellingBill } from "@/interfaces/selling";
import { ICustomer } from "@/interfaces/customer";

export const columns: ColumnDef<ISellingBill>[] = [
  {
    accessorKey: "id",
    header: "#Mã đơn",
  },
  {
    accessorKey: "createAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const createAt = row.getValue("createAt") as string;
      return <div>{dateFormat(createAt)}</div>;
    },
  },
  {
    accessorKey: "employee",
    header: "Nhân viên tạo",
    cell: ({ row }) => {
      const employeeName = row.getValue<IEmployee>("employee").fullName;
      return <div className="line-clamp-1">{employeeName}</div>;
    },
  },

  {
    accessorKey: "customer",
    header: "Khách hàng",
    cell: ({ row }) => {
      const customer = row.getValue<ICustomer>("customer");
      const customerName = customer ? customer.name : "Khách lẻ";
      return <div className="line-clamp-1">{customerName}</div>;
    },
  },
  {
    accessorKey: "totalPayment",
    header: "Tổng giá",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPayment"));
      const formatted = new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Giảm giá",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("discount"));
      const formatted = new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row, table }) => {
      const bill = row.original;

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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                table.options.meta?.onOpenSpectingSellingBill &&
                  table.options.meta?.onOpenSpectingSellingBill(bill.id);
              }}
            >
              Chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
