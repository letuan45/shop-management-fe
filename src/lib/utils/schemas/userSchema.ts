import { z } from "zod";

export const userSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Bạn phải cung cấp tên tài khoản!",
  }),
  password: z.string().trim().min(1, {
    message: "Bạn phải cung cấp mật khẩu!",
  }),
  roleId: z.string().trim().min(1, { message: "Bạn phải cung cấp Quyền" }),
  isActive: z.boolean(),
  isUpdatePassword: z.boolean(),
});
