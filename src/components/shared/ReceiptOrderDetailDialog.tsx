import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getReceiptOrder } from "@/services/receiptService";
import { Card } from "../ui/card";
import LoadingIndicator from "./LoadingIndicator";
import EmptyData from "./EmptyData";
import { currencyFormat, dateFormat } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number;
}

const ReceiptOrderDetailDialog = ({ isOpen, setIsOpen, orderId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["receipt-detail", orderId],
    queryFn: ({ signal }) => getReceiptOrder({ signal, orderId }),
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[850px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng nhập</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <ul className="flex h-96 flex-col gap-4 overflow-y-auto">
              {isLoading && (
                <>
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </>
              )}
              {!isLoading && isError && <EmptyData />}
              {!isLoading && data && (
                <>
                  {data.ReceiptOrderDetail.map((item) => {
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
                              Giá nhập: {currencyFormat(item.price)} VND
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
                    Nhà cung cấp:
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {data.supplier.name}
                    </span>
                  </h3>
                  <h3 className="my-1 flex items-center">
                    Email nhà cung cấp:
                    <span className="ml-1 line-clamp-1 font-semibold">
                      {data.supplier.email}
                    </span>
                  </h3>
                </div>
                <h3 className="text-md font-semibold text-yellow-500">
                  Tổng giá:{" "}
                  {currencyFormat(
                    data.ReceiptOrderDetail.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0,
                    ),
                  )}{" "}
                  VND
                </h3>
              </div>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptOrderDetailDialog;
