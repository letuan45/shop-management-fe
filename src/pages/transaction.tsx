import UpdateSellingOrderDialog from "@/components/sellingDialogs/UpdateSellingOrderDialog";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomDatepicker from "@/components/shared/CustomDatepicker";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SellingBillDetailDialog from "@/components/shared/SellingBillDetailDialog";
import SellingOrderDetailDialog from "@/components/shared/SellingOrderDetailDialog";
import TableSellingBill from "@/components/tables/sellingBills/tableSellingBill";
import TableSellingOrder from "@/components/tables/sellingOrder/tableSellingOrder";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/utils";
import {
  cancelSellingOrder,
  getAllSellingBill,
  getAllSellingOrder,
  makeBill,
} from "@/services/sellingService";
import { BookmarkIcon } from "@radix-ui/react-icons";
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
    href: "/transaction",
    title: "Quản lý chứng từ bán hàng",
  },
];

const Transaction = () => {
  const [searchParams] = useSearchParams();
  const [fromOrderDate, setFromOrderDate] = useState("");
  const [toOrderDate, setToOrderDate] = useState("");
  const [fromBillDate, setFromBillDate] = useState("");
  const [toBillDate, setToBillDate] = useState("");
  const [spectingBillIsOpen, setSpectingBillIsOpen] = useState(false);
  const [spectingBillId, setSpectingBillId] = useState(0);

  const [updateOrderIsOpen, setUpdateOrderIsOpen] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(0);

  const [spectingOrderIsOpen, setSpectingOrderIsOpen] = useState(false);
  const [spectingOrderId, setSpectingOrderId] = useState(0);

  const [orderIsCanceling, setOrderIsCanceling] = useState(false);
  const [cancelingOrderId, setCancelingOrderId] = useState(0);

  const orderPage = searchParams.get("orderPage");
  const billPage = searchParams.get("billPage");

  const {
    data: sellingOrdersData,
    isLoading: sellingOrdersIsLoading,
    isError: sellingOrdersIsError,
  } = useQuery({
    queryKey: ["get-selling-order", orderPage, fromOrderDate, toOrderDate],
    queryFn: ({ signal }) =>
      getAllSellingOrder({
        signal,
        page: orderPage,
        fromDate: fromOrderDate,
        toDate: toOrderDate,
      }),
  });

  const {
    data: sellingBillsData,
    isLoading: sellingBillsIsLoading,
    isError: sellingBillsIsError,
  } = useQuery({
    queryKey: ["get-selling-bill", billPage, fromBillDate, toBillDate],
    queryFn: ({ signal }) =>
      getAllSellingBill({
        signal,
        page: billPage,
        fromDate: fromBillDate,
        toDate: toBillDate,
      }),
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
      queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
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

  const { mutate: cancelOrderAction, isPending: cancelOrderIsPending } =
    useMutation({
      mutationKey: ["cancel-selling-order"],
      mutationFn: cancelSellingOrder,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Hủy đơn bán hàng thành công",
          variant: "success",
        });

        queryClient.invalidateQueries({ queryKey: ["get-selling-order"] });
        setOrderIsCanceling(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const openCancelOrderHandler = (orderId: number) => {
    setOrderIsCanceling(true);
    setCancelingOrderId(orderId);
  };

  const spectingSellingOrderHanlder = (orderId: number) => {
    setSpectingOrderIsOpen(true);
    setSpectingOrderId(orderId);
  };

  const updateSellingOrderHandler = (orderId: number) => {
    setUpdatingOrderId(orderId);
    setUpdateOrderIsOpen(true);
  };

  const spectingBillHandler = (billId: number) => {
    setSpectingBillIsOpen(true);
    setSpectingBillId(billId);
  };

  const makeBillHandler = (orderId: number, customerPayment: number) => {
    makeBillAction({ orderId, customerPayment });
  };

  const handleConfirmCancelOrder = () => {
    if (cancelingOrderId > 0) {
      cancelOrderAction({ orderId: cancelingOrderId });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-4">
      {cancelingOrderId > 0 && (
        <ConfirmationDialog
          isLoading={cancelOrderIsPending}
          onConfirm={handleConfirmCancelOrder}
          isOpen={orderIsCanceling}
          setIsOpen={setOrderIsCanceling}
          description="Sau khi hủy đơn hàng bạn không thể hoàn tác thao tác này!"
        />
      )}
      {/* Specting Order */}
      <SellingOrderDetailDialog
        isOpen={spectingOrderIsOpen}
        orderId={spectingOrderId}
        setIsOpen={setSpectingOrderIsOpen}
      />
      {/* Specting bill */}
      <SellingBillDetailDialog
        isOpen={spectingBillIsOpen}
        setIsOpen={setSpectingBillIsOpen}
        billId={spectingBillId}
      />
      <UpdateSellingOrderDialog
        isLoading={makeBillIsPending}
        onMakeBill={makeBillHandler}
        orderId={updatingOrderId}
        open={updateOrderIsOpen}
        onOpenChange={setUpdateOrderIsOpen}
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center font-semibold">
          <BookmarkIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý chứng từ bán hàng</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <Card className="col-span-2 animate-fadeIn">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <div>
              <CardTitle>Danh sách đơn bán hàng</CardTitle>
              <CardDescription className="mt-1">
                Quản lý đơn bán hàng
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="mr-2 text-nowrap text-sm">Từ ngày: </div>
                <CustomDatepicker
                  onChangeDate={(date) => {
                    setFromOrderDate(date);
                  }}
                />
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-nowrap text-sm">Đến ngày: </div>
                <CustomDatepicker
                  onChangeDate={(date) => {
                    setToOrderDate(date);
                  }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[19rem] overflow-hidden max-lg:h-[20rem] max-md:h-[21rem]">
          {sellingOrdersIsLoading && <LoadingIndicator />}
          {!sellingOrdersIsLoading && sellingOrdersIsError && <EmptyData />}
          {!sellingOrdersIsLoading &&
            !sellingOrdersIsError &&
            sellingOrdersData && (
              <TableSellingOrder
                onCancelOrder={openCancelOrderHandler}
                tableData={sellingOrdersData.data}
                onSpectingSellingOrder={spectingSellingOrderHanlder}
                onUpdateSellingOrder={updateSellingOrderHandler}
              />
            )}
        </CardContent>
        {sellingOrdersData && Math.ceil(sellingOrdersData.total / 5) > 1 && (
          <CardFooter className="flex justify-between">
            <CustomPagination
              pageParam="orderPage"
              totalItem={sellingOrdersData.total}
              maxItemPerPage={5}
            />
          </CardFooter>
        )}
      </Card>
      <Card className="col-span-2 animate-fadeIn">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <div>
              <CardTitle>Danh sách đơn bán hàng</CardTitle>
              <CardDescription className="mt-1">
                Quản lý đơn bán hàng
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="mr-2 text-nowrap text-sm">Từ ngày: </div>
                <CustomDatepicker
                  onChangeDate={(date) => {
                    setFromBillDate(date);
                  }}
                />
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-nowrap text-sm">Đến ngày: </div>
                <CustomDatepicker
                  onChangeDate={(date) => {
                    setToBillDate(date);
                  }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[19rem] overflow-hidden max-lg:h-[20rem] max-md:h-[21rem]">
          {sellingBillsIsLoading && <LoadingIndicator />}
          {!sellingBillsIsLoading && sellingBillsIsError && <EmptyData />}
          {!sellingBillsIsLoading &&
            !sellingBillsIsError &&
            sellingBillsData && (
              <TableSellingBill
                tableData={sellingBillsData.data}
                onSpectingSellingBill={spectingBillHandler}
              />
            )}
        </CardContent>
        {sellingBillsData &&
          sellingBillsData.data.length > 0 &&
          Math.ceil(sellingBillsData.total / 5) > 1 && (
            <CardFooter className="flex justify-between">
              <CustomPagination
                pageParam="billPage"
                totalItem={sellingBillsData.total}
                maxItemPerPage={5}
              />
            </CardFooter>
          )}
      </Card>
    </section>
  );
};

export default Transaction;
