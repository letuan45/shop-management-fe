import ChooseCustomerDialog from "@/components/sellingDialogs/ChooseCustomerDialog";
import UpdateSellingOrderDialog from "@/components/sellingDialogs/UpdateSellingOrderDialog";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import SellingBillDetailDialog from "@/components/shared/SellingBillDetailDialog";
import SellingCartItem from "@/components/shared/SellingCartItem";
import SellingProductItem from "@/components/shared/SellingProductItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { ICart, ICartItem } from "@/interfaces/cart";
import { IProduct } from "@/interfaces/product";
import { currencyFormat, queryClient } from "@/lib/utils";
import { getCart } from "@/services/cartService";
import { getAllProduct } from "@/services/productService";
import { createSellingOrder, makeBill } from "@/services/sellingService";
import { BackpackIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const BREADCRUMB_ITEMS = [
  {
    id: 1,
    href: "/",
    title: "Trang chủ",
  },
  {
    id: 2,
    href: "/selling",
    title: "Bán hàng",
  },
];

const checkActive = (product: IProduct, cart: ICart | undefined) => {
  if (cart === undefined) return true;
  if (cart.cartItems.length === 0) return true;
  const item = cart.cartItems.find((item) => item.productId === product.id);
  if (item) {
    return false;
  }
  return true;
};

const Selling = () => {
  const [isOpenChooseCustomer, setIsOpenChooseCustomer] = useState(false);
  const {
    data: cartData,
    isLoading: cartIsLoading,
    isError: cartIsError,
  } = useQuery({
    queryKey: ["get-cart"],
    queryFn: ({ signal }) => getCart({ signal }),
  });
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const [updateOrderIsOpen, setUpdateOrderIsOpen] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState(0);
  const [spectingBillIsOpen, setSpectingBillIsOpen] = useState(false);
  const [spectingBillId, setSpectingBillId] = useState(0);

  const {
    data: productsData,
    isError: productsIsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["selling-products", page, search],
    queryFn: ({ signal }) =>
      getAllProduct({ signal, page, search, pageSize: 8, isForSell: true }),
  });

  const { mutate: createOrderAction, isPending: createOrderIsPending } =
    useMutation({
      mutationKey: ["create-selling-order"],
      mutationFn: createSellingOrder,
      onSuccess(data) {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Tạo đơn mua hàng thành công",
          variant: "success",
        });
        const { id: orderId } = data;
        setUpdateOrderIsOpen(true);
        setUpdateOrderId(orderId);
        setIsOpenChooseCustomer(false);
        queryClient.invalidateQueries({ queryKey: ["get-cart"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: makeBillAction, isPending: makeBillIsPending } = useMutation({
    mutationKey: ["make-bill"],
    mutationFn: makeBill,
    onSuccess: (data) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Lập hóa đơn bán hàng thành công",
        variant: "success",
      });

      setUpdateOrderIsOpen(false);
      setSpectingBillIsOpen(true);
      setSpectingBillId(data.id);
      queryClient.invalidateQueries({ queryKey: ["selling-products"] });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  let total = 0;
  if (cartData) {
    total = cartData.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.exportPrice,
      0,
    );
  }

  const createOrderWithCustomerHandler = (customerId: number) => {
    createOrderAction({ customerId });
  };

  const createOrderHandler = () => {
    createOrderAction({ customerId: 0 });
  };

  const makeBillHandler = (orderId: number, customerPayment: number) => {
    makeBillAction({ orderId, customerPayment });
  };

  return (
    <section>
      {/* Specting bill */}
      <SellingBillDetailDialog
        isOpen={spectingBillIsOpen}
        setIsOpen={setSpectingBillIsOpen}
        billId={spectingBillId}
      />
      {/* Update selling order dialog */}
      <UpdateSellingOrderDialog
        isLoading={makeBillIsPending}
        onMakeBill={makeBillHandler}
        orderId={updateOrderId}
        open={updateOrderIsOpen}
        onOpenChange={setUpdateOrderIsOpen}
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center font-semibold">
          <BackpackIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Bán hàng</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <div className="grid grid-cols-9 gap-4">
        <Card className="col-span-6 w-full animate-fadeIn">
          <CardHeader className="pb-2">
            <div className="flex w-full items-center justify-between">
              <div>
                <CardTitle>Danh sách sản phẩm</CardTitle>
                <CardDescription className="mt-1">
                  Chọn sản phẩm để thêm vào giỏ hàng
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <SearchBar />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[600px]">
            {productsIsLoading && (
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
                <Skeleton className="h-60" />
              </div>
            )}
            {!productsIsLoading && productsIsError && <EmptyData />}
            {!productsIsLoading && productsData && (
              <ul className="grid h-full grid-cols-4 gap-4">
                {productsData.data.map((item) => {
                  return (
                    <li key={item.id}>
                      <SellingProductItem
                        item={item}
                        isActive={checkActive(item, cartData)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
          {productsData && Math.ceil(productsData.total / 8) > 1 && (
            <CardFooter className="flex justify-between">
              <CustomPagination
                pageParam="page"
                totalItem={productsData.total}
                maxItemPerPage={8}
              />
            </CardFooter>
          )}
        </Card>
        <Card className="col-span-3 w-full animate-fadeIn">
          <CardHeader className="pb-2">
            <div className="flex w-full items-center justify-between">
              <div className="w-full text-right">
                <CardTitle>Giỏ hàng</CardTitle>
                <CardDescription className="mt-1">
                  Xác nhận giỏ hàng để tạo đơn hàng
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {cartIsLoading && (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            )}
            {!cartIsLoading && cartIsError && (
              <p className="text-center text-sm">Giỏ hàng trống</p>
            )}
            {!cartIsLoading && cartData && (
              <ul className="flex h-[28rem] flex-col gap-2 overflow-y-auto">
                {cartData.cartItems
                  .sort((a, b) => a.id - b.id)
                  .map((item: ICartItem) => (
                    <li key={item.id}>
                      <SellingCartItem item={item} />
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-md font-semibold text-yellow-500">
              Tổng tiền: {currencyFormat(total)} VND
            </p>
            <p className=" text-center text-sm italic">Tạo đơn bán hàng</p>
            <ChooseCustomerDialog
              isLoading={createOrderIsPending}
              onChoosenCustomer={createOrderWithCustomerHandler}
              open={isOpenChooseCustomer}
              onOpenChange={setIsOpenChooseCustomer}
            />
            <Button className="w-full" onClick={createOrderHandler}>
              {createOrderIsPending ? (
                <LoadingIndicator />
              ) : (
                "Tạo đơn hàng với khách hàng lẻ"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Selling;
