import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getCustomers } from "@/services/customerService";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../shared/LoadingIndicator";
import TableCustomer from "../tables/customer/tableCustomer";
import EmptyData from "../shared/EmptyData";
import SearchBar from "../shared/SearchBar";
import { Input } from "../ui/input";
import { useState } from "react";
import { CardFooter } from "../ui/card";
import CustomPagination from "../shared/CustomPagination";
import { Button } from "../ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onChoosenCustomer: (customerId: number) => void;
  isLoading: boolean;
}

const ChooseCustomerDialog = ({
  open,
  onOpenChange,
  onChoosenCustomer,
  isLoading,
}: Props) => {
  const [searchParams] = useSearchParams();
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("Khách lẻ");

  const customerPage = searchParams.get("customerPage");
  const customerSearch = searchParams.get("customerSearch");
  const {
    data: customerData,
    isError: customerIsError,
    isLoading: customerIsLoading,
  } = useQuery({
    queryKey: ["customers", customerPage, customerSearch],
    queryFn: ({ signal }) =>
      getCustomers({ signal, page: customerPage, search: customerSearch }),
  });

  const chooseCustomerHandler = (customerId: number, customerName: string) => {
    setCustomerId(customerId);
    setCustomerName(customerName);
  };

  const choosenCustomerHandler = () => {
    onChoosenCustomer(customerId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md border-2 border-primary px-4 py-2 text-sm font-medium text-violet-800 shadow transition-colors duration-300 hover:bg-primary/90 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:text-white">
        Tạo đơn hàng với khách hàng thành viên
      </DialogTrigger>
      <DialogContent className="min-w-[650px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Chọn khách hàng</DialogTitle>
          <DialogDescription>
            Bỏ qua chọn khách hàng thành viên nếu bạn đang giao dịch cho khách
            hàng lẻ
          </DialogDescription>
          <div className="grid grid-cols-2 gap-4">
            <SearchBar param="customerSearch" />
            <div className="flex items-center">
              <p className="mr-2 text-nowrap text-sm">Khách hàng</p>
              <div className="relative">
                <Input readOnly value={customerName} className="pr-3" />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setCustomerId(0);
                    setCustomerName("Khách lẻ");
                  }}
                >
                  <CrossCircledIcon />
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>
        {customerIsLoading && <LoadingIndicator />}
        {customerIsError ||
          (customerData && customerData.total === 0 && <EmptyData />)}
        {customerData && customerData.total > 0 && (
          <TableCustomer
            tableData={customerData.data}
            isForChoose
            onChooseCustomer={chooseCustomerHandler}
          />
        )}
        {customerData && Math.ceil(customerData.total / 5) > 1 && (
          <CardFooter className="flex justify-between pb-1">
            <CustomPagination
              pageParam="customerPage"
              totalItem={customerData.total}
              maxItemPerPage={5}
            />
          </CardFooter>
        )}
        <div className="flex justify-end">
          <Button className="w-fit" onClick={choosenCustomerHandler}>
            {isLoading ? <LoadingIndicator /> : "Tạo đơn mua hàng"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseCustomerDialog;
