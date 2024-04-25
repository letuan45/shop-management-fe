import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSellingOrder } from "@/services/sellingService";
import { getAllProduct } from "@/services/productService";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import ProductOrderItem from "../shared/ProductOrderItem";
import { currencyFormat } from "@/lib/utils";
import CustomPagination from "../shared/CustomPagination";
import EmptyData from "../shared/EmptyData";
import OrderItem from "../shared/OrderItem";
import { Card } from "../ui/card";
import { toast } from "../ui/use-toast";

interface Props {
  orderId: number;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  exportPrice: number;
  detailId: number;
}

const UpdateSellingOrderDialog = ({ orderId, open, onOpenChange }: Props) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("pageProduct");
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [choosenCustomer, setChoosenCustomer] = useState(0);

  const { data: sellingOrder } = useQuery({
    queryKey: ["get-selling-order"],
    queryFn: ({ signal }) => getSellingOrder({ signal, orderId }),
    enabled: orderId > 0,
  });

  const {
    data: productsData,
    isError: productsIsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: ({ signal }) =>
      getAllProduct({ signal, page, search: searchTerm, pageSize: 8 }),
  });

  useEffect(() => {
    if (sellingOrder) {
      const innitOrderItems: IOrderItem[] = [];
      sellingOrder.sellingOrderDetails.forEach((item) => {
        innitOrderItems.push({
          id: item.product.id,
          image: item.product.image,
          exportPrice: item.price,
          name: item.product.name,
          quantity: item.quantity,
          detailId: item.id,
        });
      });

      innitOrderItems.sort((a, b) => a.detailId - b.detailId);

      setOrderItems(innitOrderItems);
      setChoosenCustomer(sellingOrder.customerId);
    }
  }, [sellingOrder]);

  const chooseItemHandler = (productId: number, quantity: number) => {
    console.log(productId, quantity);
  };

  const removeOrderItemHandler = (orderDetailId: number) => {
    // removeOrderItemAction({ orderDetailId });
  };

  const minusOneHandler = (orderDetailId: number) => {
    // minusOneAction({ orderDetailId });
  };

  const plusOneHandler = (orderDetailId: number) => {
    // plusOneAction({ orderDetailId });
  };

  const changeQuantityHandler = (orderDetailId: number, quantity: number) => {
    if (quantity === 0) {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Dữ liệu không hợp lệ",
        variant: "destructive",
      });
      return;
    }
    // updateQuantityAction({ orderDetailId, quantity });
  };

  const totalPayment = sellingOrder?.sellingOrderDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[1100px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Đơn bán hàng</DialogTitle>
          <DialogDescription>
            Thông tin đơn bán hàng và chỉnh sửa
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-4">
          <div className="relative col-span-3 flex h-[35rem] flex-col gap-2">
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-2" />
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value.trim());
                }}
                id="cate-name"
                className="col-span-3 h-8 pl-8"
              />
            </div>
            {productsIsLoading && (
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
                <Skeleton className="col-span-1 h-56" />
              </div>
            )}
            {!productsIsLoading && productsIsError && <EmptyData />}
            {!productsIsLoading && !productsIsError && productsData && (
              <ul className="relative grid grid-cols-4 gap-4">
                {productsData.data.map((productItem) => {
                  const isHasProduct =
                    orderItems.findIndex(
                      (item) => item.id === productItem.id,
                    ) >= 0;
                  return (
                    <li key={productItem.id} className="col-span-1">
                      <ProductOrderItem
                        // isActive={
                        //   isHasProduct || addOrderItemIsLoading ? false : true
                        // }
                        isForSell
                        isActive
                        item={productItem}
                        onChooseItem={chooseItemHandler}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            {!productsIsLoading &&
              productsData &&
              Math.ceil(productsData.total / 8) > 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                  <CustomPagination
                    pageParam="pageProduct"
                    totalItem={productsData.total}
                    maxItemPerPage={8}
                  />
                </div>
              )}
          </div>
          <Card className="col-span-2 flex flex-col justify-between p-4">
            {orderItems.length === 0 && <div className="h-[372px]" />}
            {orderItems.length > 0 && (
              <ul className="flex h-[372px] flex-col gap-2 overflow-y-auto">
                {orderItems.map((item) => (
                  <OrderItem
                    // changeQtyValIsLoading={updateQuantityIsPending}
                    changeQtyValIsLoading={false}
                    onChangeQtyVal={changeQuantityHandler}
                    onMinusOne={minusOneHandler}
                    // minusOneIsLoading={minusOneIsPending}
                    minusOneIsLoading={false}
                    onPlusOne={plusOneHandler}
                    // plusOneIsLoading={plusOneIsPending}
                    plusOneIsLoading={false}
                    defaultValue={item.quantity}
                    // isRemoving={removeOrderItemIsPending}
                    isRemoving={false}
                    key={item.id}
                    isForUpdate
                    item={item}
                    onRemoveOrderItem={() => {
                      removeOrderItemHandler(item.detailId);
                    }}
                  />
                ))}
              </ul>
            )}
            <div className="flex flex-col gap-2">
              <div className="font-semibold">
                <span>Tổng tiền:</span>
                <span className="ml-1 text-primary">
                  {totalPayment && currencyFormat(totalPayment)} VND
                </span>
              </div>
              {/* {supplierIsLoading && <Skeleton className="h-12 w-full" />}
              {!supplierIsLoading && suppliersIsError && (
                <div>Lỗi khi load nhà cung cấp</div>
              )}
              {!supplierIsLoading && suppliers && (
                <Select
                  disabled
                  defaultValue={choosenSupplier > 0 ? `${choosenSupplier}` : ""}
                  onValueChange={(val) => {
                    setChoosenSupplier(+val);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Nhà cung cấp</SelectLabel>
                      {suppliers.map((item) => (
                        <SelectItem value={`${item.id}`} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )} */}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSellingOrderDialog;
