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
import { IProduct } from "@/interfaces/product";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;
      return (
        <div className="h-20 w-20">
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-md border border-slate-100 object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Tình trạng",
    cell: ({ row }) => {
      const status = Number(row.getValue("status"));
      if (status === 0) {
        return <Badge variant="secondary">Hết hàng</Badge>;
      } else if (status === 1) {
        return <Badge>Còn hàng</Badge>;
      }
      return <Badge variant="destructive">Ngừng kinh doanh</Badge>;
    },
  },
  {
    accessorKey: "importPrice",
    header: "Giá nhập",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("importPrice"));
      const formatted = new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "exportPrice",
    header: "Giá bán",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("exportPrice"));
      const formatted = new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Tồn",
  },
  {
    accessorKey: "discount",
    header: "Giảm giá",
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount"));

      return <div>{discount.toFixed(2)}</div>;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row, table }) => {
      const product = row.original;

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
                table.options.meta?.onOpenEditProduct &&
                  table.options.meta?.onOpenEditProduct(product.id);
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
