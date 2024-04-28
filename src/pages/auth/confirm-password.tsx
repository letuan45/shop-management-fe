import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Logo from "@/components/shared/Logo";
import CityImage from "../../assets/images/city.jpg";
import ToggleThemeButton from "@/components/shared/ToggleThemeButton";
import Gitbutton from "@/components/shared/Gitbutton";
import { Link, useParams } from "react-router-dom";
import { SubmitForgotPasswordSchema } from "@/lib/utils/schemas/forgotPwdSchema";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { toast } from "@/components/ui/use-toast";
import { confirmResetPassword } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

const ConfirmPassword = () => {
  const { resetPwToken } = useParams();
  const form = useForm<z.infer<typeof SubmitForgotPasswordSchema>>({
    resolver: zodResolver(SubmitForgotPasswordSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  const {
    mutate: confirmResetPassAction,
    isPending: confirmResetPassIsPending,
  } = useMutation({
    mutationKey: ["confirm-reset-password"],
    mutationFn: confirmResetPassword,
    onSuccess: (data) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof SubmitForgotPasswordSchema>) {
    if (!resetPwToken) {
      toast({
        title: "Thông báo: xác thực",
        description: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
      return;
    }
    const { password, rePassword } = values;
    if (password !== rePassword) {
      toast({
        title: "Thông báo: xác thực",
        description: "Mật khẩu không trùng nhau",
        variant: "destructive",
      });
    }

    confirmResetPassAction({ resetToken: resetPwToken, newPassword: password });
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-900 p-10">
      <div className="grid max-w-[1000px] grid-cols-2 gap-8 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <div className="col-span-2 flex flex-col justify-between md:col-span-1">
          <div className="flex items-center justify-between">
            <Logo size="small" />
            <div className="flex items-center">
              <Gitbutton />
              <div className="ml-4 flex items-center">
                <ToggleThemeButton />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${CityImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="show mt-6 w-full rounded-md md:hidden"
          ></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-8 min-w-80 px-16 py-5 max-md:my-4 max-md:px-0 max-md:py-2"
            >
              <div className="my-6 max-md:hidden">
                <h2 className="text-2xl font-semibold text-violet-600">
                  Shop Management
                </h2>
                <p className="text-sm font-normal">Phần mềm quản lý bán hàng</p>
              </div>
              <h3 className="text-xl font-semibold">Khôi phục mật khẩu</h3>
              <p className="mt-2 text-sm font-normal">
                Cung cấp mật khẩu mới để khôi phục
              </p>
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
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="rePassword"
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="text-red-500 dark:text-red-700" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mb-3 mt-4 w-full">
                {confirmResetPassIsPending ? (
                  <ReloadIcon className="animate-spin" />
                ) : (
                  "Xác nhận"
                )}
              </Button>
              <Link to="/login" className="block">
                <Button className="w-full" variant="secondary">
                  Quay về đăng nhập
                </Button>
              </Link>
            </form>
          </Form>
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">@2024 developed by LeTuan</p>
            <p className="text-sm text-gray-400">version: v1.0</p>
          </div>
        </div>
        <div className="md:col-span-1">
          <div
            style={{
              backgroundImage: `url(${CityImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="flex h-full w-full flex-col justify-end rounded-md"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
