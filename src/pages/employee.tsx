import EmployeeForm from "@/components/forms/EmployeeForm";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import TableEmployee from "@/components/tables/employee/tableEmployee";
import { Button } from "@/components/ui/button";
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
import { getAllEmployee } from "@/services/employeeService";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";

const Employee = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) => getAllEmployee({ signal }),
  });
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
                <DialogTrigger>
                  <Button>
                    <PlusCircledIcon className="mr-1" /> Thêm nhân viên
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo nhân viên</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm />
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
