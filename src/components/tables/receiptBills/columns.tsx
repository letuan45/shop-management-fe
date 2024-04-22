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
import { Badge } from "@/components/ui/badge";
import { IReceiptBill } from "@/interfaces/receipt";
import { dateFormat } from "@/lib/utils";
import { IEmployee } from "@/interfaces/employee";
import { ISupplier } from "@/interfaces/supplier";

export const columns: ColumnDef<IReceiptBill>[] = [
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
    accessorKey: "supplier",
    header: "Nhà cung cấp",
    cell: ({ row }) => {
      const supplierName = row.getValue<ISupplier>("supplier").name;
      return <div className="line-clamp-1">{supplierName}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Tình trạng",
    cell: ({ row }) => {
      const status = Number(row.getValue("status"));
      if (status === 0) {
        return <Badge variant="secondary">Đã tạo</Badge>;
      }
      return <Badge>Đã tạo</Badge>;
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
                table.options.meta?.onOpenSpectingReceiptBill &&
                  table.options.meta?.onOpenSpectingReceiptBill(bill.id);
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
