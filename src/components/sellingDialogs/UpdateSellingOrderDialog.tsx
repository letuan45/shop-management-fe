import { useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addOrderItem,
  changeCustomer,
  getSellingOrder,
  minusOneQtySellingOrder,
  plusOneQtySellingOrder,
  removeOrderItem,
  updateQtySellingOrder,
} from "@/services/sellingService";
import { getAllProduct } from "@/services/productService";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import ProductOrderItem from "../shared/ProductOrderItem";
import { currencyFormat, queryClient } from "@/lib/utils";
import CustomPagination from "../shared/CustomPagination";
import EmptyData from "../shared/EmptyData";
import OrderItem from "../shared/OrderItem";
import { Card } from "../ui/card";
import { toast } from "../ui/use-toast";
import { getAllCustomer } from "@/services/customerService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import LoadingIndicator from "../shared/LoadingIndicator";

interface Props {
  orderId: number;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onMakeBill: (orderId: number, customerPayment: number) => void;
  isLoading: boolean;
}

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  exportPrice: number;
  detailId: number;
}

const UpdateSellingOrderDialog = ({
  orderId,
  open,
  onOpenChange,
  onMakeBill,
  isLoading,
}: Props) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("pageProduct");
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [choosenCustomer, setChoosenCustomer] = useState(0);
  const [customerPayment, setCustomerPayment] = useState(0);

  const { data: sellingOrder } = useQuery({
    queryKey: ["get-selling-order", orderId],
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

  const {
    data: customersData,
    isError: customersIsError,
    isLoading: customersIsLoading,
  } = useQuery({
    queryKey: ["customers", page, searchTerm],
    queryFn: ({ signal }) => getAllCustomer({ signal }),
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

  const { mutate: addOrderItemAction, isPending: addOrderItemIsPending } =
    useMutation({
      mutationKey: ["add-selling-item"],
      mutationFn: addOrderItem,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thêm chi tiết bán hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: removeOrderItemAction, isPending: removeOrderItemIsPending } =
    useMutation({
      mutationKey: ["remove-selling-item"],
      mutationFn: removeOrderItem,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Xóa chi tiết bán hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: minusOrderItemAction, isPending: minusOrderItemIsPending } =
    useMutation({
      mutationKey: ["minus-selling-item"],
      mutationFn: minusOneQtySellingOrder,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa chi tiết bán hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: plusOrderItemAction, isPending: plusOrderItemIsPending } =
    useMutation({
      mutationKey: ["plus-selling-item"],
      mutationFn: plusOneQtySellingOrder,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa chi tiết bán hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: updateOrderItemAction, isPending: updateOrderItemIsPending } =
    useMutation({
      mutationKey: ["update-selling-item"],
      mutationFn: updateQtySellingOrder,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa chi tiết bán hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: changeCustomerAction, isPending: changeCustomerIsPending } =
    useMutation({
      mutationKey: ["change-customer"],
      mutationFn: changeCustomer,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Đổi khách hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const chooseItemHandler = (productId: number, quantity: number) => {
    if (sellingOrder) {
      addOrderItemAction({ orderId: sellingOrder.id, productId, quantity });
    }
  };

  const removeOrderItemHandler = (orderDetailId: number) => {
    removeOrderItemAction({ orderDetailId });
  };

  const minusOneHandler = (orderDetailId: number) => {
    minusOrderItemAction({ orderDetailId });
  };

  const plusOneHandler = (orderDetailId: number) => {
    plusOrderItemAction({ orderDetailId });
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
    updateOrderItemAction({ orderDetailId, quantity });
  };

  const makeBillHandler = () => {
    if (sellingOrder && customerPayment > 0) {
      let totalPayment = 0;
      totalPayment = sellingOrder?.sellingOrderDetails.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const discount = sellingOrder ? sellingOrder.discount : 0;
      if (customerPayment < totalPayment - discount) {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Số tiền thanh toán không hợp lệ",
          variant: "destructive",
        });
        return;
      }

      onMakeBill(sellingOrder.id, customerPayment);
    }
  };

  const changeCustomerHanlder = () => {
    if (sellingOrder) {
      changeCustomerAction({
        orderId: sellingOrder.id,
        customerId: choosenCustomer,
      });
    }
  };

  const totalPayment = sellingOrder?.sellingOrderDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discount = sellingOrder ? sellingOrder.discount : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[1100px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Đơn bán hàng</DialogTitle>
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
                        isActive={
                          isHasProduct || addOrderItemIsPending ? false : true
                        }
                        isForSell
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
            {orderItems.length === 0 && <div className="h-[332px]" />}
            {orderItems.length > 0 && (
              <ul className="flex h-[332px] flex-col gap-2 overflow-y-auto">
                {orderItems.map((item) => (
                  <OrderItem
                    changeQtyValIsLoading={updateOrderItemIsPending}
                    onChangeQtyVal={changeQuantityHandler}
                    onMinusOne={minusOneHandler}
                    minusOneIsLoading={minusOrderItemIsPending}
                    onPlusOne={plusOneHandler}
                    plusOneIsLoading={plusOrderItemIsPending}
                    defaultValue={item.quantity}
                    isRemoving={removeOrderItemIsPending}
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
              {customersIsLoading && <Skeleton className="h-12 w-full" />}
              {!customersIsLoading && customersIsError && (
                <div>Lỗi khi load danh sách khách hàng</div>
              )}
              {!customersIsLoading &&
                customersData &&
                customersData?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Select
                        defaultValue={`${choosenCustomer}`}
                        onValueChange={(val) => {
                          setChoosenCustomer(+val);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhà khách hàng" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectGroup>
                            <SelectLabel>Khách hàng</SelectLabel>
                            <SelectItem value="0">Khách lẻ</SelectItem>
                            {customersData.map((item) => (
                              <SelectItem value={`${item.id}`} key={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={changeCustomerHanlder}
                      >
                        {changeCustomerIsPending ? (
                          <LoadingIndicator />
                        ) : (
                          "Xác nhận đổi"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              <div className="flex justify-between font-semibold">
                <div>
                  <span>Tổng:</span>
                  <span className="ml-1 text-primary">
                    {totalPayment && currencyFormat(totalPayment)} Đ
                  </span>
                </div>
                <div>
                  <span>Giảm giá:</span>
                  <span className="ml-1 text-primary">
                    {totalPayment && currencyFormat(discount)} Đ
                  </span>
                </div>
              </div>
              <div>
                <span>Tổng tiền thanh toán:</span>
                <span className="ml-1 text-primary">
                  {totalPayment && currencyFormat(totalPayment - discount)} Đ
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="Số tiền khách trả"
                  value={customerPayment}
                  onChange={(e) => {
                    if (isNaN(+e.target.value)) return;
                    setCustomerPayment(+e.target.value);
                  }}
                  className="pr-10"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500">
                  {currencyFormat(customerPayment)}
                </span>
              </div>
              <Button onClick={makeBillHandler}>
                {isLoading ? <LoadingIndicator /> : "Lập hóa đơn"}
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSellingOrderDialog;
