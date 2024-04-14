import EmployeeForm from "@/components/forms/EmployeeForm";
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
import { createEmployee, getAllEmployee } from "@/services/employeeService";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";

const Employee = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) => getAllEmployee({ signal }),
  });

  const {
    mutate: createAction,
    isPending: createIsPending,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: createEmployee,
  });

  const createEmployeeHandler = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <Card className="w-full">
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
              <Dialog>
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
                  <EmployeeForm submitAction={createEmployeeHandler} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingIndicator />}
          {isError && <EmptyData />}
          {data && <TableEmployee tableData={data.data} />}
        </CardContent>
        {data && Math.ceil(data.total / 10) > 2 && (
          <CardFooter className="flex justify-between">
            <CustomPagination totalItem={data.total} maxItemPerPage={10} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Employee;
