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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Logo from "@/components/shared/Logo";
import CityImage from "../../assets/images/city.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ToggleThemeButton from "@/components/shared/ToggleThemeButton";
import Gitbutton from "@/components/shared/Gitbutton";
import { ForgotPasswordSchema } from "@/lib/utils/schemas/forgotPwdSchema";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authService";
import { toast } from "@/components/ui/use-toast";

const CarouselItems = [
  {
    id: 1,
    content: (
      <div className="text-sm">
        <h5>Account demo dành cho bạn với role quản lý</h5>
        <ul className="my-2 ml-4 list-disc">
          <li>username: tuan</li>
          <li>password: addmin</li>
        </ul>
        <p className="italic text-gray-300">
          Chúc bạn có trải nghiệm tuyệt vời!
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="text-sm">
        <h5>Account demo dành cho bạn với role nhân viên</h5>
        <ul className="my-2 ml-4 list-disc">
          <li>username: tuan</li>
          <li>password: addmin</li>
        </ul>
        <p className="italic text-gray-300">
          Chúc bạn có trải nghiệm tuyệt vời!
        </p>
      </div>
    ),
  },
];

const ForgotPassword = () => {
  const { mutate: resetPassAction, isPending: resetPassIsPending } =
    useMutation({
      mutationKey: ["reset-password"],
      mutationFn: resetPassword,
      onSuccess: (data) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: data.message,
          variant: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thất bại, hãy kiểm tra lại thông tin!",
          variant: "destructive",
        });
      },
    });

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    const { email, username } = values;
    resetPassAction({ email, username });
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
          >
            <Carousel className="h-fit w-full">
              <CarouselContent>
                {CarouselItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-1">
                      <Card className="rounded-md border-gray-500 bg-black bg-opacity-50 text-white shadow-lg backdrop-blur-sm backdrop-filter">
                        <CardContent className="p-6">
                          {item.content}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1/2 top-0 -translate-x-[120%] border-none bg-slate-950 text-white shadow-md hover:bg-slate-950 hover:text-white" />
              <CarouselNext className="right-1/2 top-0 translate-x-[120%] border-none bg-slate-950 text-white shadow-md hover:bg-slate-950 hover:text-white" />
            </Carousel>
          </div>
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
              <h3 className="text-xl font-semibold">Quên mật khẩu</h3>
              <p className="mt-2 text-sm font-normal">
                Hãy cung cấp tên tài khoản và email của bạn
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
                    <FormMessage className="text-red-500 dark:text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Địa chỉ email"
                        {...field}
                        id="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="text-red-500 dark:text-red-700" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mb-3 mt-4 w-full">
                {resetPassIsPending ? (
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
          >
            <Carousel className="h-fit w-full max-md:hidden">
              <CarouselContent>
                {CarouselItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-1">
                      <Card className="rounded-md border-gray-500 bg-black bg-opacity-50 text-white shadow-lg backdrop-blur-sm backdrop-filter">
                        <CardContent className="p-6">
                          {item.content}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-top-4 left-1/2 -translate-x-[120%] border-none bg-slate-950 text-white hover:bg-slate-950 hover:text-white" />
              <CarouselNext className="-top-4 right-1/2 translate-x-[120%] border-none bg-slate-950 text-white hover:bg-slate-950 hover:text-white" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
