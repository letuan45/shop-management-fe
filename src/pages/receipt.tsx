import CreateReceiptOrder from "@/components/create-receipt-order/CreateReceiptOrder";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomDatepicker from "@/components/shared/CustomDatepicker";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import ReceiptBillDetailDialog from "@/components/shared/ReceiptBillDetailDialog";
import ReceiptOrderDetailDialog from "@/components/shared/ReceiptOrderDetailDialog";
import TableReceiptBill from "@/components/tables/receiptBills/tableReceiptBill";
import TableReceiptOrder from "@/components/tables/receiptOrder/tableReceiptOrder";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import UpdateReceiptOrder from "@/components/update-receipt-order/UpdateReceiptOrder";
import { IReceiptOrderTransfer } from "@/interfaces/receipt";
import { queryClient } from "@/lib/utils";
import {
  cancelReceiptOrder,
  createReceiptOrder,
  getAllReceiptBill,
  getAllReceiptOrder,
  makeReceiptBill,
} from "@/services/receiptService";
import {
  ArchiveIcon,
  FileTextIcon,
  Pencil2Icon,
  ReaderIcon,
} from "@radix-ui/react-icons";
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
    href: "/receipt",
    title: "Quản lý nhập hàng",
  },
];

const Receipt = () => {
  const [searchParams] = useSearchParams();
  const [fromOrderDate, setFromOrderDate] = useState("");
  const [toOrderDate, setToOrderDate] = useState("");
  const [fromBillDate, setFromBillDate] = useState("");
  const [toBillDate, setToBillDate] = useState("");
  const [createOrderIsOpen, setCreateOrderIsOpen] = useState(false);
  const [spectingOrder, setSpectingOrder] = useState(0);
  const [orderDetailIsOpen, setOrderDetailIsOpen] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState(0);
  const [updateOrderIsOpen, setUpdateOrderIsOpen] = useState(false);
  const [orderMakingBill, setOrderMakingBill] = useState(0);
  const [isMakingBill, setIsMakingBill] = useState(false);
  const [orderCancelling, setOrderCancelling] = useState(0);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [spectingBillIsOpen, setSpectingBillIsOpen] = useState(false);
  const [spectingBillId, setSpecingBillId] = useState(0);

  const page = searchParams.get("page");
  const billPage = searchParams.get("billPage");

  const {
    mutate: createReceiptOrderAction,
    isPending: createReceiptOrderIsLoading,
  } = useMutation({
    mutationKey: ["createReceiptOrder"],
    mutationFn: createReceiptOrder,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Tạo đơn nhập hàng thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["receptOrders"] });
      setCreateOrderIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: makeReceiptBillAction, isPending: makeReceiptBillIsPending } =
    useMutation({
      mutationKey: ["makeBill"],
      mutationFn: makeReceiptBill,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Tạo hóa đơn thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["receptOrders"],
        });
        queryClient.invalidateQueries({
          queryKey: ["receptBills"],
        });
        setIsMakingBill(false);
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
    mutate: cancelReceipOrderAction,
    isPending: cancelReceiptOrderIsPending,
  } = useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: cancelReceiptOrder,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Hủy đơn nhập thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["receptOrders"],
      });
      setIsCancellingOrder(false);
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
    data: receiptOrders,
    isError: receiOrdersIsError,
    isLoading: receiptOrderIsLoading,
  } = useQuery({
    queryKey: ["receptOrders", page, fromOrderDate, toOrderDate],
    queryFn: ({ signal }) =>
      getAllReceiptOrder({
        signal,
        page,
        fromDate: fromOrderDate,
        toDate: toOrderDate,
      }),
  });

  const {
    data: receiptBills,
    isError: receiBillsIsError,
    isLoading: receiptBillsIsLoading,
  } = useQuery({
    queryKey: ["receptBills", billPage, fromBillDate, toBillDate],
    queryFn: ({ signal }) =>
      getAllReceiptBill({
        signal,
        page: billPage,
        fromDate: fromBillDate,
        toDate: toBillDate,
      }),
  });

  const handleSpectingOrder = (orderId: number) => {
    setSpectingOrder(orderId);
    setOrderDetailIsOpen(true);
  };

  const handleUpdatingOrder = (orderId: number) => {
    setUpdateOrderId(orderId);
    setUpdateOrderIsOpen(true);
  };

  const handleSpectingBill = (billId: number) => {
    setSpecingBillId(billId);
    setSpectingBillIsOpen(true);
  };

  const createReceiptOrderHandler = (orderTransfer: IReceiptOrderTransfer) => {
    createReceiptOrderAction({ receiptOrder: orderTransfer });
  };

  const handleOpenMakeBill = (orderId: number) => {
    setOrderMakingBill(orderId);
    setIsMakingBill(true);
  };

  const handleOpenCancelOrder = (orderId: number) => {
    setOrderCancelling(orderId);
    setIsCancellingOrder(true);
  };

  const handleConfirmCancelOrder = () => {
    if (orderCancelling > 0) {
      cancelReceipOrderAction({ orderId: orderCancelling });
    }
  };

  const handleConfirmMakeBill = () => {
    if (orderMakingBill > 0) {
      makeReceiptBillAction({ orderId: orderMakingBill });
    }
  };

  return (
    <div>
      {orderMakingBill > 0 && (
        <ConfirmationDialog
          isLoading={makeReceiptBillIsPending}
          onConfirm={handleConfirmMakeBill}
          isOpen={isMakingBill}
          setIsOpen={setIsMakingBill}
          description="Sau khi xác nhận đơn hàng, hệ thống sẽ tạo hóa đơn tương ứng và bạn không thể hoàn tác thao tác này!"
        />
      )}
      {orderCancelling > 0 && (
        <ConfirmationDialog
          isLoading={cancelReceiptOrderIsPending}
          onConfirm={handleConfirmCancelOrder}
          isOpen={isCancellingOrder}
          setIsOpen={setIsCancellingOrder}
          description="Sau khi hủy đơn hàng bạn không thể hoàn tác thao tác này!"
        />
      )}
      {/* Update Order */}
      {updateOrderId > 0 && (
        <UpdateReceiptOrder
          orderId={updateOrderId}
          isOpen={updateOrderIsOpen}
          setIsOpen={setUpdateOrderIsOpen}
        />
      )}
      {/* Order Detail Dialog */}
      {spectingOrder > 0 && (
        <ReceiptOrderDetailDialog
          orderId={spectingOrder}
          isOpen={orderDetailIsOpen}
          setIsOpen={setOrderDetailIsOpen}
        />
      )}
      {/* Bill Detail Dialog */}
      {spectingBillId > 0 && (
        <ReceiptBillDetailDialog
          billId={spectingBillId}
          isOpen={spectingBillIsOpen}
          setIsOpen={setSpectingBillIsOpen}
        />
      )}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center font-semibold">
          <ArchiveIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý nhập hàng</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 grid animate-fadeIn grid-cols-2 gap-4">
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-purple-400/40 p-4 dark:bg-purple-400/10">
              <div className="rounded-md bg-primary p-2">
                <FileTextIcon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng số đơn hàng</h3>
              <h6 className="text-xl font-bold">120</h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-blue-400/40 p-4 dark:bg-blue-400/10">
              <div className="rounded-md bg-blue-500 p-2">
                <ReaderIcon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng số hóa đơn</h3>
              <h6 className="text-xl font-bold">120</h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-green-400/40 p-4 dark:bg-green-400/10">
              <div className="rounded-md bg-green-500 p-2">
                <Pencil2Icon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Số hàng đã nhập</h3>
              <h6 className="text-xl font-bold">1200</h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-yellow-400/40 p-4 dark:bg-yellow-400/10">
              <div className="rounded-md bg-yellow-500 p-2">
                <Pencil2Icon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng chi</h3>
              <h6 className="text-xl font-bold">1200</h6>
            </div>
          </Card>
        </div>
        <Card className="col-span-1 flex w-full animate-fadeIn p-6"></Card>
        <Card className="col-span-2 animate-fadeIn">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div>
                <CardTitle>Danh sách đơn hàng nhập</CardTitle>
                <CardDescription className="mt-1">
                  Quản lý đơn hàng nhập
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
                {/* Create Dialog */}
                <CreateReceiptOrder
                  isOpen={createOrderIsOpen}
                  setIsOpen={setCreateOrderIsOpen}
                  isLoading={createReceiptOrderIsLoading}
                  onCreateReceiptOrder={createReceiptOrderHandler}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[19rem] overflow-hidden max-lg:h-[20rem] max-md:h-[21rem]">
            {receiptOrderIsLoading && <LoadingIndicator />}
            {!receiptOrderIsLoading && receiOrdersIsError && <EmptyData />}
            {!receiptOrderIsLoading && !receiOrdersIsError && receiptOrders && (
              <TableReceiptOrder
                onMakeBill={handleOpenMakeBill}
                onCancelOrder={handleOpenCancelOrder}
                tableData={receiptOrders.data}
                onSpectingReceiptOrder={handleSpectingOrder}
                onUpdateReceiptOrder={handleUpdatingOrder}
              />
            )}
          </CardContent>
          {receiptOrders && Math.ceil(receiptOrders.total / 5) > 1 && (
            <CardFooter className="flex justify-between">
              <CustomPagination
                pageParam="page"
                totalItem={receiptOrders.total}
                maxItemPerPage={5}
              />
            </CardFooter>
          )}
        </Card>
        <Card className="col-span-2 animate-fadeIn">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div>
                <CardTitle>Danh sách hóa đơn nhập hàng</CardTitle>
                <CardDescription className="mt-1">
                  Quản lý hóa đơn nhập hàng
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
                {/* Create Dialog */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[19rem] overflow-hidden max-lg:h-[20rem] max-md:h-[21rem]">
            {receiptBillsIsLoading && <LoadingIndicator />}
            {!receiptBillsIsLoading && receiBillsIsError && <EmptyData />}
            {!receiptBillsIsLoading && !receiBillsIsError && receiptBills && (
              <TableReceiptBill
                tableData={receiptBills.data}
                onSpectingReceiptBill={handleSpectingBill}
              />
            )}
          </CardContent>
          {receiptBills && Math.ceil(receiptBills.total / 5) > 1 && (
            <CardFooter className="flex justify-between">
              <CustomPagination
                pageParam="billPage"
                totalItem={receiptBills.total}
                maxItemPerPage={5}
              />
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Receipt;
