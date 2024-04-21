import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { getAllProduct } from "@/services/productService";
import EmptyData from "../shared/EmptyData";
import ProductReceiptItem from "../shared/ProductReceiptItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCallback, useEffect, useState } from "react";
import OrderItem from "../shared/OrderItem";
import CustomPagination from "../shared/CustomPagination";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { getAllSupplier } from "@/services/supplierService";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { currencyFormat } from "@/lib/utils";
import {
  IReceiptOrderTransfer,
  IReceiptOrderTransferItem,
} from "@/interfaces/receipt";
import { toast } from "../ui/use-toast";
import LoadingIndicator from "../shared/LoadingIndicator";

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  importPrice: number;
}

interface Props {
  onCreateReceiptOrder: (orderTransfer: IReceiptOrderTransfer) => void;
  isLoading: boolean;
}

const CreateReceiptOrder = ({ onCreateReceiptOrder, isLoading }: Props) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("pageProduct");
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [summary, setSummary] = useState(0);
  const [choosenSupplier, setChoosenSupplier] = useState(0);

  useEffect(() => {
    if (orderItems.length > 0) {
      const sum = orderItems.reduce((acc, item) => {
        return acc + item.quantity * item.importPrice;
      }, 0);
      setSummary(sum);
    }
  }, [orderItems]);

  const {
    data: productsData,
    isError: productsIsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: ({ signal }) =>
      getAllProduct({ signal, page, search: searchTerm, pageSize: 8 }),
  });

  const {
    data: suppliers,
    isError: suppliersIsError,
    isLoading: supplierIsLoading,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: ({ signal }) => getAllSupplier({ signal }),
  });

  const chooseItemHandler = (
    productId: number,
    quantity: number,
    name: string,
    image: string,
    importPrice: number,
  ) => {
    setOrderItems((oldState) => [
      ...oldState,
      { id: productId, quantity, name, image, importPrice },
    ]);
  };

  const removeOrderItemHandler = (orderId: number) => {
    setOrderItems((oldState) => [
      ...oldState.filter((item) => item.id !== orderId),
    ]);
  };

  const createReceiptOrderHandler = () => {
    if (choosenSupplier === 0) {
      toast({
        title: "Thông báo: Thao tác người dùng",
        description: "Hãy chọn nhà cung cấp",
        variant: "destructive",
      });
      return;
    }
    if (orderItems.length === 0) {
      toast({
        title: "Thông báo: Thao tác người dùng",
        description: "Đơn hàng không được trống!",
        variant: "destructive",
      });
      return;
    }
    const receiptOrderItems: IReceiptOrderTransferItem[] = [];
    orderItems.forEach((item) => {
      receiptOrderItems.push({ productId: item.id, quantity: item.quantity });
    });
    const receiptOrderTransfer: IReceiptOrderTransfer = {
      supplierId: choosenSupplier,
      receiptOrderItems,
    };
    onCreateReceiptOrder(receiptOrderTransfer);
  };

  const changeQuantityHandler = useCallback(
    (orderItemId: number, quantity: number) => {
      setOrderItems((oldState) =>
        [...oldState].map((item) => {
          if (item.id === orderItemId && item.quantity !== quantity) {
            return { ...item, quantity };
          }
          return item;
        }),
      );
    },
    [],
  );

  return (
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
                orderItems.findIndex((item) => item.id === productItem.id) >= 0;
              return (
                <li key={productItem.id} className="col-span-1">
                  <ProductReceiptItem
                    isActive={isHasProduct ? false : true}
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
                key={item.id}
                onChangeQuantity={changeQuantityHandler}
                item={item}
                onRemoveOrderItem={removeOrderItemHandler}
              />
            ))}
          </ul>
        )}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">
            <span>Tổng tiền:</span>
            <span className="ml-1 text-primary">
              {currencyFormat(summary)} VND
            </span>
          </div>
          {supplierIsLoading && <Skeleton className="h-12 w-full" />}
          {!supplierIsLoading && suppliersIsError && (
            <div>Lỗi khi load nhà cung cấp</div>
          )}
          {!supplierIsLoading && suppliers && (
            <Select
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
          )}
          <Button className="w-full" onClick={createReceiptOrderHandler}>
            {isLoading ? <LoadingIndicator /> : "Tạo đơn nhập"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateReceiptOrder;
