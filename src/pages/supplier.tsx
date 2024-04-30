import SupplierForm from "@/components/forms/SupplierForm";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import TableSupplier from "@/components/tables/supplier/tableSupplier";
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
import { ICreateSupplier } from "@/interfaces/supplier";
import { queryClient } from "@/lib/utils";
import {
  createSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "@/services/supplierService";
import { Link2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
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
    href: "/supplier",
    title: "Quản lý nhà cung cấp",
  },
];

const Supplier = () => {
  const [searchParams] = useSearchParams();
  const [createSupplierIsOpen, setCreateSupplierIsOpen] = useState(false);
  const [updateSupplierIsOpen, setUpdateSupplierIsOpen] = useState(false);
  const [updatingSupplierId, setUpdatingSupplier] = useState(0);

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const {
    data: supplierData,
    isError: supplierIsError,
    isLoading: supplierIsLoading,
  } = useQuery({
    queryKey: ["suppliers", page, search],
    queryFn: ({ signal }) => getSuppliers({ signal, page, search }),
  });

  const { data: supplierEditData, isLoading: supplierEditIsLoading } = useQuery(
    {
      queryKey: ["suppliers", updatingSupplierId],
      queryFn: ({ signal }) =>
        getSupplier({ signal, supplierId: updatingSupplierId }),
      enabled: updatingSupplierId > 0,
    },
  );

  const { mutate: updateSupplierAction, isPending: updateSupplierIsLoading } =
    useMutation({
      mutationKey: ["update-supplier"],
      mutationFn: updateSupplier,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa nhà cung cấp thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        setUpdateSupplierIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: createSupplierAction, isPending: createSupplierIsPending } =
    useMutation({
      mutationKey: ["create-supplier"],
      mutationFn: createSupplier,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thêm nhà cung cấp thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        setCreateSupplierIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const openEditSupplierHandler = (supplierId: number) => {
    setUpdateSupplierIsOpen(true);
    setUpdatingSupplier(supplierId);
  };

  const createSupplierHandler = (createPayload: ICreateSupplier) => {
    createSupplierAction(createPayload);
  };

  const editSupplierHandler = (
    updatePayload: ICreateSupplier,
    supplierId: number,
  ) => {
    updateSupplierAction({ supplierId, supplier: updatePayload });
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center font-semibold">
          <Link2Icon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý nhà cung cấp</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <div className="flex w-full items-center justify-between max-sm:flex-col max-sm:gap-3">
            <div>
              <CardTitle>Danh sách nhà cung cấp</CardTitle>
              <CardDescription className="mt-1">
                Quản lý thông tin nhà cung cấp
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              {/* Create Dialog */}
              <Dialog
                open={createSupplierIsOpen}
                onOpenChange={setCreateSupplierIsOpen}
              >
                <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <PlusCircledIcon className="mr-1" /> Thêm nhà cung cấp
                </DialogTrigger>
                <DialogContent className="min-w-[250px] max-sm:min-w-[200px]">
                  <DialogHeader>
                    <DialogTitle>Tạo nhà cung cấp</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  <SupplierForm
                    isLoading={createSupplierIsPending}
                    onSubmitCreate={createSupplierHandler}
                  />
                </DialogContent>
              </Dialog>
              {/* Update Dialog */}
              <Dialog
                open={updateSupplierIsOpen}
                onOpenChange={setUpdateSupplierIsOpen}
              >
                <DialogContent className="min-w-[250px] max-sm:min-w-[200px]">
                  <DialogHeader>
                    <DialogTitle>Sửa sản phẩm</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  {supplierEditIsLoading && (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      <Skeleton className="my-3 h-[95px] w-full rounded-md" />
                    </div>
                  )}
                  {!supplierEditIsLoading && supplierEditData && (
                    <SupplierForm
                      isEdit
                      supplier={supplierEditData}
                      isLoading={updateSupplierIsLoading}
                      onSubmitEdit={editSupplierHandler}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[20rem] overflow-hidden max-lg:h-[23rem] max-md:h-[24rem]">
          {supplierIsLoading && <LoadingIndicator />}
          {supplierIsError ||
            (supplierData && supplierData.total === 0 && <EmptyData />)}
          {supplierData && (
            <TableSupplier
              tableData={supplierData.data}
              onEditSupplier={openEditSupplierHandler}
            />
          )}
        </CardContent>
        {supplierData && Math.ceil(supplierData.total / 5) > 1 && (
          <CardFooter className="flex justify-between">
            <CustomPagination
              pageParam="page"
              totalItem={supplierData.total}
              maxItemPerPage={5}
            />
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default Supplier;
