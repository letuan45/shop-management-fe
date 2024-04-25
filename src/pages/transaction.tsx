import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomDatepicker from "@/components/shared/CustomDatepicker";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import TableSellingOrder from "@/components/tables/sellingOrder/tableSellingOrder";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllSellingOrder } from "@/services/sellingService";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
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

  const openMakeBillHandler = (orderId: number) => {
    console.log(orderId);
  };

  const openCancelOrderHandler = (orderId: number) => {
    console.log(orderId);
  };

  const spectingSellingOrderHanlder = (orderId: number) => {
    console.log(orderId);
  };

  const updateSellingOrderHandler = (orderId: number) => {
    console.log(orderId);
  };

  return (
    <section>
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
                onMakeBill={openMakeBillHandler}
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
              pageParam="page"
              totalItem={sellingOrdersData.total}
              maxItemPerPage={5}
            />
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default Transaction;
