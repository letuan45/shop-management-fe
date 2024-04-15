import {
  createEmployeeSchema,
  editEmployeeSchema,
} from "@/lib/utils/schemas/employeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Datepicker from "../shared/Datepicker";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IEmployee } from "@/interfaces/employee";
interface Props {
  submitAction: (data: FormData) => void;
  isLoading: boolean;
  isEdit?: boolean;
  employee?: IEmployee | undefined;
}

const EmployeeForm = ({ submitAction, isLoading, isEdit, employee }: Props) => {
  const selectedSchema = isEdit ? editEmployeeSchema : createEmployeeSchema;
  const form = useForm<z.infer<typeof selectedSchema>>({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      fullName: employee ? `${employee.fullName}` : "",
      phone: employee ? `${employee.phone}` : "",
      email: employee ? `${employee.email}` : "",
      address: employee ? `${employee.address}` : "",
      image: undefined,
      dateOfBirth: employee ? `${employee.dateOfBirth}` : "",
    },
  });

  function onSubmit(values: z.infer<typeof createEmployeeSchema>) {
    const employeeData = new FormData();
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const value = values[key as keyof typeof values];
        if (value) {
          if (key === "image") {
            employeeData.append("file", value[0]);
          } else {
            employeeData.append(key, value);
          }
        }
      }
    }

    for (const [key, value] of employeeData.entries()) {
      console.log(`${key}:`, value);
    }
    // submitAction(employeeData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Họ và tên ít nhất 2 ký tự"
                      {...field}
                      id="full-name"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số điện thoại hợp lệ"
                      {...field}
                      id="phone"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập Email hợp lệ"
                      {...field}
                      id="email"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Chọn hình ảnh từ máy {isEdit ? "(Đã có)" : "(*)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="image"
                      type="file"
                      value={undefined}
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      className="dark:file:text-violet-400"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ (*)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-28 max-sm:min-h-12"
                      {...field}
                      placeholder="Nhập địa chỉ"
                      id="address"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh (*)</FormLabel>
                  <FormControl>
                    <Datepicker field={{ ...field }} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col">
              <p className="mb-3 text-sm italic max-sm:text-center">
                Đảm bảo các dữ liệu bạn nhập không trùng
              </p>
              <Button className="w-full" type="submit">
                {isLoading ? (
                  <ReloadIcon className="animate-spin" />
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
