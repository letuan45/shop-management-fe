import { createEmployeeSchema } from "@/lib/utils/schemas/employeeSchema";
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

const EmployeeForm = () => {
  const form = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      image: {},
    },
  });

  function onSubmit(values: z.infer<typeof createEmployeeSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="Nhập Email hợp lệ" {...field} id="email" />
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
              <FormLabel>Chọn hình ảnh từ máy (*)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="image"
                  type="file"
                  value={""}
                  className="dark:file:text-violet-400"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button type="submit">Xác nhận</Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
