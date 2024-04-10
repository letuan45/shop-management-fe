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
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/utils/schemas/loginShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GitHubLogoIcon, SunIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import CityImage from "../../../public/assets/images/city.jpg";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-violet-900 p-10">
      <div className="grid grid-cols-2 p-6 shadow-lg rounded-xl bg-white gap-8">
        <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <Logo size="small" />
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-1">
                <GitHubLogoIcon width={20} height={20} />
                <span className="font-light text-sm">Github</span>
              </Link>
              <button className="ml-4">
                <SunIcon width={20} height={20} />
              </button>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${CityImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-full rounded-md show md:hidden h-32 mt-4"
          ></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-w-80 my-10 px-16 py-14 max-md:py-2 max-md:my-4 max-md:px-0"
            >
              <h3 className="text-2xl font-semibold">Đăng nhập</h3>
              <p className="text-sm font-normal mt-2">
                Chào mừng bạn trở lại 👋
              </p>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tên đăng nhập"
                        {...field}
                        id="username"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between my-2">
                <div className="flex items-center">
                  <Checkbox id="remember-password" />
                  <label
                    htmlFor="remember-password"
                    className="text-sm select-none ml-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ghi nhớ mật khẩu
                  </label>
                </div>
                <Link to="/" className="text-sm text-violet-900 ml-10">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button type="submit" className="w-full mt-4">
                Xác nhận
              </Button>
            </form>
          </Form>
          <p className="text-sm text-gray-400 text-center">
            @2024 coded by LeTuan
          </p>
        </div>
        <div className="md:col-span-1">
          <div
            style={{
              backgroundImage: `url(${CityImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-full rounded-md"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
