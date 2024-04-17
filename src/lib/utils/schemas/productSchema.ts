import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Bạn phải cung cấp tên sản phẩm" }),
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
  status: z.string().trim(),
  discount: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giảm giá" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giảm giá phải là một số",
    }),
  importPrice: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giá nhập" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giá nhập phải là một số",
    }),
  exportPrice: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giá bán" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giá bán phải là một số",
    }),
  categoryId: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp danh mục" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giảm giá phải là một số",
    }),
});

export const editProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Bạn phải cung cấp tên sản phẩm" }),
  image: z
    .any()
    .optional()
    .refine((files) => files?.length == 1, "Bạn phải cung cấp hình ảnh.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Hình ảnh không được quá 5MB`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ cho phép định dạng: .jpg, .jpeg, .png and .webp",
    ),
  status: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp tình trạng" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giảm giá phải là một số",
    }),
  discount: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giảm giá" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giảm giá phải là một số",
    }),
  importPrice: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giá nhập" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giá nhập phải là một số",
    }),
  exportPrice: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp giá bán" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giá bán phải là một số",
    }),
  categoryId: z
    .string()
    .trim()
    .min(1, { message: "Bạn phải cung cấp danh mục" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Giảm giá phải là một số",
    }),
});
