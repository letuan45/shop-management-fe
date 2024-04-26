import { getSellingBill } from "@/services/sellingService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import EmptyData from "./EmptyData";
import LoadingIndicator from "./LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import { currencyFormat, dateFormat } from "@/lib/utils";
import { Card } from "../ui/card";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  billId: number;
}

const SellingBillDetailDialog = ({ isOpen, setIsOpen, billId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["selling-bill-detail", billId],
    queryFn: ({ signal }) => getSellingBill({ signal, billId }),
    enabled: billId > 0,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[850px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Chi tiết hóa đơn nhập hàng</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <ul className="flex h-[30rem] flex-col gap-4 overflow-y-auto">
              {isLoading && (
                <>
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </>
              )}
              {!isLoading && isError && <EmptyData />}
              {!isLoading && data && (
                <>
                  {data.sellingBillDetails.map((item) => {
                    return (
                      <li
                        className="flex max-h-20 rounded-sm border"
                        key={item.id}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-16 rounded-sm"
                        />
                        <div className="flex w-full items-center justify-between">
                          <div className="ml-2 p-2 text-sm">
                            <h4 className="max-w-1/2 line-clamp-1 font-semibold text-primary">
                              {item.product.name}
                            </h4>
                            <span className="italic">
                              Số lượng: {item.quantity}
                            </span>
                          </div>
                          <div className="mr-2 p-2 text-right text-sm">
                            <h4 className="line-clamp-1">
                              Giá bán: {currencyFormat(item.price)} VND
                            </h4>
                            <span className="italic">
                              Đơn giá:{" "}
                              {currencyFormat(item.price * item.quantity)} VND
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
          <Card className="col-span-2 p-4">
            {isLoading && <LoadingIndicator />}
            {!isLoading && isError && <EmptyData />}
            {!isLoading && data && (
              <div className="flex h-full flex-col justify-between">
                <div className="text-sm">
                  <h3 className="my-1 flex items-center">
                    Nhân viên tạo:
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {data.employee.fullName}
                    </span>
                  </h3>
                  <h3 className="my-1 flex items-center">
                    Số điện thoại:
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {data.employee.phone}
                    </span>
                  </h3>
                  <h3 className="my-1 flex items-center">
                    Ngày tạo
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {dateFormat(data.createAt)}
                    </span>
                  </h3>
                  <div className="my-3 h-[1px] w-full bg-slate-500"></div>
                  <h3 className="my-1 flex items-center">
                    Tên khách hàng:
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {data && data.customer ? data.customer.name : "Khách lẻ"}
                    </span>
                  </h3>
                  {data && data.customer && (
                    <h3 className="my-1 flex items-center">
                      Số điện thoại khách hàng:
                      <span className="ml-1 line-clamp-1 font-semibold">
                        {data.customer.phone}
                      </span>
                    </h3>
                  )}
                </div>
                <div>
                  <h3 className="text-md font-semibold text-yellow-500">
                    Tổng giá: {currencyFormat(data.totalPayment)} VND
                  </h3>
                  <h3 className="text-md font-semibold">
                    Giảm giá: {currencyFormat(data.discount)} VND
                  </h3>
                  <h3 className="text-md font-semibold ">
                    Khách thanh toán: {currencyFormat(data.customerPayment)} VND
                  </h3>
                  <h3 className="text-md font-semibold text-yellow-500">
                    Tiền thối:{" "}
                    {currencyFormat(
                      data.customerPayment - data.discount - data.totalPayment,
                    )}{" "}
                    VND
                  </h3>
                </div>
              </div>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellingBillDetailDialog;
