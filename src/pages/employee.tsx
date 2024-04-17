import EmployeeForm from "@/components/forms/EmployeeForm";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import TableEmployee from "@/components/tables/employee/tableEmployee";
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
import { queryClient } from "@/lib/utils";
import {
  createEmployee,
  editEmployee,
  getAllEmployee,
  getEmployee,
} from "@/services/employeeService";
import { PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
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
    href: "/employee",
    title: "Quản lý nhân sự",
  },
];

const Employee = () => {
  const [searchParams] = useSearchParams();
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(0);

  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["employees", page, search],
    queryFn: ({ signal }) => getAllEmployee({ signal, page, search }),
  });

  const { data: editEmployeeData, isLoading: getEmployeeIsLoading } = useQuery({
    queryKey: ["employees", editEmployeeId],
    queryFn: () => getEmployee(editEmployeeId),
    enabled: editEmployeeId > 0,
  });

  // Create
  const { mutate: createAction, isPending: createIsPending } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: createEmployee,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Tạo nhân viên thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setCreateDialogIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update
  const { mutate: editAction, isPending: editIsPending } = useMutation({
    mutationKey: ["editEmployee"],
    mutationFn: editEmployee,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa nhân viên thành công",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setEditDialogIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createEmployeeHandler = (data: FormData | undefined) => {
    data && createAction(data);
  };

  const editEmployeeHandler = (
    data: FormData,
    employeeId: number | undefined,
  ) => {
    employeeId && editAction({ formData: data, employeeId });
  };

  const handleOpenEditEmployeeHandler = (employeeIdPayload: number) => {
    setEditDialogIsOpen(true);
    setEditEmployeeId(employeeIdPayload);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4 flex items-center font-semibold">
          <PersonIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý nhân sự</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>

      <Card className="animate-fadeIn w-full">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <div>
              <CardTitle>Danh sách nhân viên</CardTitle>
              <CardDescription className="mt-1">
                Quản lý tài khoản và thông tin nhân viên
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              {/* Create Dialog */}
              <Dialog
                open={createDialogIsOpen}
                onOpenChange={setCreateDialogIsOpen}
              >
                <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <PlusCircledIcon className="mr-1" /> Thêm nhân viên
                </DialogTrigger>
                <DialogContent className="min-w-[650px] max-sm:min-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Tạo nhân viên</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm
                    submitAction={createEmployeeHandler}
                    isLoading={createIsPending}
                  />
                </DialogContent>
              </Dialog>
              {/* Update Dialog */}
              <Dialog
                open={editDialogIsOpen}
                onOpenChange={setEditDialogIsOpen}
              >
                <DialogContent className="min-w-[650px] max-sm:min-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Sửa nhân viên</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  {getEmployeeIsLoading && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <Skeleton className="my-3 h-[50px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[50px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[50px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[50px] w-full rounded-md" />
                      </div>
                      <div className="col-span-1">
                        <Skeleton className="my-3 h-28 w-full rounded-md" />
                        <Skeleton className="my-3 h-[50px] w-full rounded-md" />
                      </div>
                    </div>
                  )}
                  {editEmployeeData && (
                    <EmployeeForm
                      submitEditAction={editEmployeeHandler}
                      isLoading={editIsPending}
                      employee={editEmployeeData}
                      isEdit
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[22rem] overflow-hidden max-lg:h-[23rem] max-md:h-[24rem]">
          {isLoading && <LoadingIndicator />}
          {isError && <EmptyData />}
          {data && (
            <TableEmployee
              tableData={data.data}
              onEditEmployee={handleOpenEditEmployeeHandler}
            />
          )}
        </CardContent>
        {data && Math.ceil(data.total / 5) > 1 && (
          <CardFooter className="flex justify-between">
            <CustomPagination totalItem={data.total} maxItemPerPage={5} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Employee;