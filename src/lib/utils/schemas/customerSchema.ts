import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Bạn phải cung cấp tên khách hàng!",
  }),
  phone: z.string().trim().min(10, {
    message: "Số điện thoại không hợp lệ",
  }),
});
