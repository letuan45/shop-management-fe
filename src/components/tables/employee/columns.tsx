import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { IEmployee } from "@/interfaces/employee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateFormat } from "@/lib/utils";

export const columns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Avatar>
          <AvatarImage
            src={image}
            alt={row.getValue("fullName")}
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Ngày sinh",
    cell: ({ row }) => {
      return <p>{dateFormat(row.getValue("dateOfBirth"))}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "isWorking",
    header: "Đang làm việc",
    cell: ({ row }) => {
      if (!row.getValue("isWorking")) {
        return (
          <div className="flex justify-center">
            <Cross2Icon />
          </div>
        );
      }
      return (
        <div className="flex justify-center">
          <CheckIcon className="text-violet-500" width={20} height={20} />
        </div>
      );
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row, table }) => {
      const employee = row.original;
      console.log();

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
            <DropdownMenuItem className="cursor-pointer">
              Quản lý tài khoản
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                table.options.meta?.onOpenEditEmployee &&
                  table.options.meta?.onOpenEditEmployee(employee.id);
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
