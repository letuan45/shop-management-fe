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
import { IReceiptOrder } from "@/interfaces/receipt";
import { dateFormat } from "@/lib/utils";
import { IEmployee } from "@/interfaces/employee";
import { ISupplier } from "@/interfaces/supplier";

export const columns: ColumnDef<IReceiptOrder>[] = [
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
      } else if (status === 1) {
        return <Badge>Đã xác nhận</Badge>;
      }
      return <Badge variant="destructive">Đã hủy</Badge>;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row, table }) => {
      const receipt = row.original;

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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                table.options.meta?.onOpenSpectingReceiptOrder &&
                  table.options.meta?.onOpenSpectingReceiptOrder(receipt.id);
              }}
            >
              Chi tiết
            </DropdownMenuItem>
            {receipt.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenMakeBill &&
                    table.options.meta?.onOpenMakeBill(receipt.id);
                }}
              >
                Xác nhận
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {receipt.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenUpdateReceiptOrder &&
                    table.options.meta?.onOpenUpdateReceiptOrder(receipt.id);
                }}
              >
                Sửa đơn hàng
              </DropdownMenuItem>
            )}
            {receipt.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenCancelOrder &&
                    table.options.meta?.onOpenCancelOrder(receipt.id);
                }}
              >
                Hủy đơn
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
