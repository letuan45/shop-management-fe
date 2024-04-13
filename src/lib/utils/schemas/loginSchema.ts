import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Bạn phải cung cấp tên tài khoản!",
  }),
  password: z.string().trim().min(1, {
    message: "Bạn phải cung cấp mật khẩu!",
  }),
});
