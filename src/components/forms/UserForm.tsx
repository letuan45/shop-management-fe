import { userSchema } from "@/lib/utils/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../shared/PasswordInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "@/services/authService";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { IUser } from "@/interfaces/auth";
import { Checkbox } from "../ui/checkbox";

interface Props {
  user: IUser | undefined;
  employeeId?: number;
  onRegister?: (
    employeeId: number,
    roleId: number,
    username: string,
    password: string,
  ) => void;
  onUpdateUser?: (
    userId: number,
    password: string,
    roleId: number,
    isActive: boolean,
    isUpdatePwd: boolean,
  ) => void;
  isLoading: boolean;
}

const UserForm = ({
  user,
  onRegister,
  employeeId,
  isLoading,
  onUpdateUser,
}: Props) => {
  const { data: rolesData, isError: rolesIsError } = useQuery({
    queryKey: ["get-roles"],
    queryFn: ({ signal }) => getAllRoles({ signal }),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user ? user.username : "",
      password: user ? "user123456" : "",
      roleId: user ? `${user.role.id}` : "",
      isActive: user ? user.isActive : true,
      isUpdatePassword: false,
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    if (!user && onRegister && employeeId) {
      onRegister(employeeId, +values.roleId, values.username, values.password);
    } else if (onUpdateUser && user) {
      onUpdateUser(
        user.id,
        values.password,
        +values.roleId,
        values.isActive,
        values.isUpdatePassword,
      );
    }
  }

  if (rolesIsError || rolesData?.length === 0) {
    return <div>Không thể lấy danh sách quyền</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full max-sm:grid-cols-1 max-sm:gap-0">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tài khoản (*)</FormLabel>
                <FormControl>
                  <Input
                    readOnly={!!user}
                    className={`${user ? "bg-slate-300" : ""}`}
                    placeholder="Điền tên tài khoản"
                    {...field}
                    id="username"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <div className={user ? "col-span-2" : "col-span-3"}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="Mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="text-red-500 dark:text-red-700" />
                  </FormItem>
                )}
              />
            </div>
            <div className={user ? "grid-cols-1" : "hidden"}>
              <FormField
                control={form.control}
                name="isUpdatePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cập nhật mật khẩu?</FormLabel>
                    <div className="item-center flex">
                      <FormLabel>
                        <label
                          htmlFor="isUpdatePassword"
                          className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Chấp nhận
                        </label>
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          disabled={!user}
                          id="isUpdatePassword"
                          checked={field.value}
                          onCheckedChange={() => field.onChange(!field.value)}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quyền tài khoản (*)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quyền tài khoản" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rolesData &&
                        rolesData.map((item) => {
                          return (
                            <SelectItem value={`${item.id}`} key={item.id}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tính khả dụng (*)</FormLabel>
                  <div className="item-center flex">
                    <FormLabel>
                      <label
                        htmlFor="isActive"
                        className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đang khả dụng
                      </label>
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        disabled={!user}
                        id="isActive"
                        checked={field.value}
                        onCheckedChange={() => field.onChange(!field.value)}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit">
            {isLoading ? <ReloadIcon className="animate-spin" /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
