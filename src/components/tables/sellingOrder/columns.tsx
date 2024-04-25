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
import { dateFormat } from "@/lib/utils";
import { IEmployee } from "@/interfaces/employee";
import { ISellingOrder } from "@/interfaces/selling";
import { ICustomer } from "@/interfaces/customer";

export const columns: ColumnDef<ISellingOrder>[] = [
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
      const sellingOrder = row.original;

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
                table.options.meta?.onOpenSpectingSellingOrder &&
                  table.options.meta?.onOpenSpectingSellingOrder(
                    sellingOrder.id,
                  );
              }}
            >
              Chi tiết
            </DropdownMenuItem>
            {sellingOrder.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenMakeSellingBill &&
                    table.options.meta?.onOpenMakeSellingBill(sellingOrder.id);
                }}
              >
                Xác nhận
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {sellingOrder.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenUpdateSellingOrder &&
                    table.options.meta?.onOpenUpdateSellingOrder(
                      sellingOrder.id,
                    );
                }}
              >
                Sửa đơn hàng
              </DropdownMenuItem>
            )}
            {sellingOrder.status === 0 && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  table.options.meta?.onOpenCancelSellingOrder &&
                    table.options.meta?.onOpenCancelSellingOrder(
                      sellingOrder.id,
                    );
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
