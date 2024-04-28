import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Bạn phải cung cấp tên tài khoản!",
  }),
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Bạn phải cung cấp mật khẩu!",
    })
    .email({ message: "Hãy nhập đúng định dạng email" }),
});

export const SubmitForgotPasswordSchema = z.object({
  password: z.string().trim().min(1, {
    message: "Bạn phải cung cấp mật khẩu",
  }),
  rePassword: z.string().trim().min(1, {
    message: "Bạn phải cung cấp mật khẩu",
  }),
});
