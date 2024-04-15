import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createEmployeeSchema = z.object({
  fullName: z.string().trim().min(2, {
    message: "Tên phải 2 ký tự trở lên",
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
  image: z
    .any()
    .refine((files) => files?.length == 1, "Bạn phải cung cấp hình ảnh.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Hình ảnh không được quá 5MB`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ cho phép định dạng: .jpg, .jpeg, .png and .webp",
    ),
  dateOfBirth: z.string().trim().min(1, {
    message: "Bạn phải cung cấp ngày sinh",
  }),
});

export const editEmployeeSchema = z.object({
  fullName: z.string().trim().min(2, {
    message: "Tên phải 2 ký tự trở lên",
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
  image: z
    .any()
    .optional()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE || !files,
      `Hình ảnh không được quá 5MB`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) || !files,
      "Chỉ cho phép định dạng: .jpg, .jpeg, .png and .webp",
    ),
  dateOfBirth: z.string().trim().min(1, {
    message: "Bạn phải cung cấp ngày sinh",
  }),
});
