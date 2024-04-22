import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/productService";
import { Skeleton } from "../ui/skeleton";
import EmptyData from "../shared/EmptyData";
import ProductReceiptItem from "../shared/ProductReceiptItem";
import { currencyFormat, queryClient } from "@/lib/utils";
import { getAllSupplier } from "@/services/supplierService";
import CustomPagination from "../shared/CustomPagination";
import OrderItem from "../shared/OrderItem";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  addOrderItem,
  getReceiptOrder,
  minusOneDetailQty,
  plusOneDetailQty,
  removeOrderItem,
  updateReceiptDetailQty,
} from "@/services/receiptService";
import LoadingIndicator from "../shared/LoadingIndicator";
import { toast } from "../ui/use-toast";

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  importPrice: number;
  detailId: number;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number;
}

const UpdateReceiptOrder = ({ isOpen, setIsOpen, orderId }: Props) => {
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

  const { mutate: addOrderItemAction, isPending: addOrderItemIsLoading } =
    useMutation({
      mutationKey: ["add-order-item"],
      mutationFn: addOrderItem,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thêm chi tiết đơn nhập thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["receipt-detail", orderId],
        });
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
      mutationKey: ["remove-order-detail"],
      mutationFn: removeOrderItem,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Xóa chi tiết đơn nhập thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["receipt-detail", orderId],
        });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: minusOneAction, isPending: minusOneIsPending } = useMutation({
    mutationKey: ["minus-one-qty"],
    mutationFn: minusOneDetailQty,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa chi tiết đơn nhập thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["receipt-detail", orderId],
      });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: plusOneAction, isPending: plusOneIsPending } = useMutation({
    mutationKey: ["plus-one-qty"],
    mutationFn: plusOneDetailQty,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa chi tiết đơn nhập thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["receipt-detail", orderId],
      });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateQuantityAction, isPending: updateQuantityIsPending } =
    useMutation({
      mutationKey: ["update-qty"],
      mutationFn: updateReceiptDetailQty,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa chi tiết đơn nhập thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["receipt-detail", orderId],
        });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const {
    data: receiptOrder,
    isLoading: receiptOrderIsLoading,
    isError: receiptOrderIsError,
  } = useQuery({
    queryKey: ["receipt-detail", orderId],
    queryFn: ({ signal }) => getReceiptOrder({ signal, orderId }),
  });

  useEffect(() => {
    if (receiptOrder) {
      const innitOrderItems: IOrderItem[] = [];
      receiptOrder.ReceiptOrderDetail.forEach((item) => {
        innitOrderItems.push({
          id: item.product.id,
          image: item.product.image,
          importPrice: item.price,
          name: item.product.name,
          quantity: item.quantity,
          detailId: item.id,
        });
      });

      innitOrderItems.sort((a, b) => a.detailId - b.detailId);

      setOrderItems(innitOrderItems);
      setChoosenSupplier(receiptOrder.supplierId);
    }
  }, [receiptOrder]);

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

  const chooseItemHandler = (productId: number, quantity: number) => {
    if (!receiptOrder) return;
    addOrderItemAction({ orderId: receiptOrder.id, productId, quantity });
  };

  const removeOrderItemHandler = (orderDetailId: number) => {
    removeOrderItemAction({ orderDetailId });
  };

  const minusOneHandler = (orderDetailId: number) => {
    minusOneAction({ orderDetailId });
  };

  const plusOneHandler = (orderDetailId: number) => {
    plusOneAction({ orderDetailId });
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
    updateQuantityAction({ orderDetailId, quantity });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[1100px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Cập nhật đơn hàng nhập</DialogTitle>
        </DialogHeader>
        {receiptOrderIsLoading && <LoadingIndicator />}
        {receiptOrderIsError && <div>Lỗi khi load đơn hàng</div>}
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
                      <ProductReceiptItem
                        isActive={
                          isHasProduct || addOrderItemIsLoading ? false : true
                        }
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
                    changeQtyValIsLoading={updateQuantityIsPending}
                    onChangeQtyVal={changeQuantityHandler}
                    onMinusOne={minusOneHandler}
                    minusOneIsLoading={minusOneIsPending}
                    onPlusOne={plusOneHandler}
                    plusOneIsLoading={plusOneIsPending}
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
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReceiptOrder;
