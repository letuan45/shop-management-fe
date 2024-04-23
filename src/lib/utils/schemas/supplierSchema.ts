import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Bạn phải cung cấp tên nhà cung cấp!",
  }),
  phone: z.string().trim().min(10, {
    message: "Số điện thoại không hợp lệ",
  }),
  email: z.string().trim().email({
    message: "Email không hợp lệ",
  }),
  address: z.string().trim().min(10, {
    message: "Địa chỉ phải 10 ký tự trở lên",
  }),
});
