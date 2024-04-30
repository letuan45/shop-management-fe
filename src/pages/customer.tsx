import CustomerForm from "@/components/forms/CustomerForm";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import TableCustomer from "@/components/tables/customer/tableCustomer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { ICreateCustomer } from "@/interfaces/customer";
import { queryClient } from "@/lib/utils";
import {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "@/services/customerService";
import { PlusCircledIcon, StarIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CityImage from "../assets/images/city.jpg";
import { Button } from "@/components/ui/button";

const BREADCRUMB_ITEMS = [
  {
    id: 1,
    href: "/",
    title: "Trang chủ",
  },
  {
    id: 2,
    href: "/customer",
    title: "Quản lý khách hàng",
  },
];

const Customer = () => {
  const [searchParams] = useSearchParams();
  const [createCustomerIsOpen, setCreateCustomerIsOpen] = useState(false);
  const [updateCustomerIsOpen, setUpdateCustomerIsOpen] = useState(false);
  const [updatingCustomerId, setUpdatingCustomerId] = useState(0);

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const {
    data: customerData,
    isError: customerIsError,
    isLoading: customerIsLoading,
  } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: ({ signal }) => getCustomers({ signal, page, search }),
  });

  const { data: customerEditData, isLoading: customerEditIsLoading } = useQuery(
    {
      queryKey: ["customers", updatingCustomerId],
      queryFn: ({ signal }) =>
        getCustomer({ signal, customerId: updatingCustomerId }),
      enabled: updatingCustomerId > 0,
    },
  );

  const { mutate: createCustomerAction, isPending: createCustomerIsPending } =
    useMutation({
      mutationKey: ["create-customer"],
      mutationFn: createCustomer,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thêm khách hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        setCreateCustomerIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: updateCustomerAction, isPending: updateCustomerIsLoading } =
    useMutation({
      mutationKey: ["update-customer"],
      mutationFn: updateCustomer,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa khách hàng thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        setUpdateCustomerIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const openEditCustomerHandler = (customerId: number) => {
    setUpdateCustomerIsOpen(true);
    setUpdatingCustomerId(customerId);
  };

  const createCustomerHandler = (payload: ICreateCustomer) => {
    createCustomerAction(payload);
  };

  const updateCustomerHandler = (
    payload: ICreateCustomer,
    customerId: number,
  ) => {
    updateCustomerAction({ customer: payload, customerId });
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center font-semibold">
          <StarIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý khách hàng</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 w-full animate-fadeIn max-2xl:col-span-3">
          <CardHeader>
            <div className="flex w-full items-center justify-between max-sm:flex-col max-sm:gap-3">
              <div>
                <CardTitle>Danh sách khách hàng</CardTitle>
                <CardDescription className="mt-1">
                  Quản lý thông tin khách hàng
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <SearchBar />
                {/* Create Dialog */}
                <Dialog
                  open={createCustomerIsOpen}
                  onOpenChange={setCreateCustomerIsOpen}
                >
                  <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <PlusCircledIcon className="mr-1" /> Thêm khách hàng
                  </DialogTrigger>
                  <DialogContent className="min-w-[250px] max-sm:min-w-[200px]">
                    <DialogHeader>
                      <DialogTitle>Tạo khách hàng</DialogTitle>
                      <DialogDescription>
                        Những trường có dấu (*) là những trường bắt buộc
                      </DialogDescription>
                    </DialogHeader>
                    <CustomerForm
                      isLoading={createCustomerIsPending}
                      onSubmitCreate={createCustomerHandler}
                    />
                  </DialogContent>
                </Dialog>
                {/* Update Dialog */}
                <Dialog
                  open={updateCustomerIsOpen}
                  onOpenChange={setUpdateCustomerIsOpen}
                >
                  <DialogContent className="min-w-[250px] max-sm:min-w-[200px]">
                    <DialogHeader>
                      <DialogTitle>Sửa khách hàng</DialogTitle>
                      <DialogDescription>
                        Những trường có dấu (*) là những trường bắt buộc
                      </DialogDescription>
                    </DialogHeader>
                    {customerEditIsLoading && (
                      <div className="flex w-full flex-col gap-2">
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      </div>
                    )}
                    {!customerEditIsLoading && customerEditData && (
                      <CustomerForm
                        isEdit
                        customer={customerEditData}
                        isLoading={updateCustomerIsLoading}
                        onSubmitEdit={updateCustomerHandler}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[20rem] overflow-hidden max-lg:h-[23rem] max-md:h-[24rem]">
            {customerIsLoading && <LoadingIndicator />}
            {customerIsError ||
              (customerData && customerData.total === 0 && <EmptyData />)}
            {customerData && (
              <TableCustomer
                tableData={customerData.data}
                onEditCustomer={openEditCustomerHandler}
              />
            )}
          </CardContent>
          {customerData && Math.ceil(customerData.total / 5) > 1 && (
            <CardFooter className="flex justify-between">
              <CustomPagination
                pageParam="page"
                totalItem={customerData.total}
                maxItemPerPage={5}
              />
            </CardFooter>
          )}
        </Card>
        <Card className="relative col-span-1 animate-fadeIn p-6 max-2xl:hidden">
          <img
            src={CityImage}
            className="h-[420px] w-full rounded-md brightness-50"
            alt="customer"
          />
          <div className="absolute left-0 top-0 z-10 flex h-full flex-col justify-between p-10">
            <div>
              <h2 className="font-semibold text-violet-300">
                Chương trình khách hàng thành viên
              </h2>
              <div className="my-2 rounded-md bg-white/30 p-2 text-white backdrop-blur-md">
                <ul className="text-sm">
                  <li>
                    <h5 className="font-semibold text-primary-foreground">
                      Khách hàng hạng đồng:
                    </h5>
                    <p className="italic text-black">
                      @Điểm tích lũy trên 600 - giảm 1% trên toàn hóa đơn
                    </p>
                  </li>
                  <li>
                    <h5 className="font-semibold text-primary-foreground">
                      Khách hàng hạng đồng:
                    </h5>
                    <p className="italic text-black">
                      @Điểm tích lũy trên 1000 - giảm 6% trên toàn hóa đơn
                    </p>
                  </li>
                  <li>
                    <h5 className="font-semibold text-primary-foreground">
                      Khách hàng hạng đồng:
                    </h5>
                    <p className="italic text-black">
                      @Điểm tích lũy trên 2000 - giảm 10% trên toàn hóa đơn
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <Button>Liên hệ thay đổi chương trình khuyến mãi</Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Customer;
