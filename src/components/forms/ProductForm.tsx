import { IProduct } from "@/interfaces/product";
import {
  createProductSchema,
  editProductSchema,
} from "@/lib/utils/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import NoImagePreload from "../../assets/images/no-image.jpg";
import { Checkbox } from "../ui/checkbox";

interface Props {
  submitAction?: (data: FormData | undefined) => void;
  submitEditAction?: (data: FormData, productId: number | undefined) => void;
  isLoading: boolean;
  isEdit?: boolean;
  product?: IProduct | undefined;
  categories: { id: number; name: string }[];
}

const ProductForm = ({
  submitAction,
  submitEditAction,
  isLoading,
  isEdit,
  product,
  categories,
}: Props) => {
  const selectedSchema = isEdit ? editProductSchema : createProductSchema;
  const [currentProductImage, setCurentProductImage] = useState("");
  const [checkBoxIsActive, setCheckBoxIsActive] = useState(false);
  const form = useForm<z.infer<typeof selectedSchema>>({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      name: product ? product.name : "",
      image: undefined,
      status: product ? `${product.status}` : "",
      importPrice: product ? `${product.importPrice}` : "",
      exportPrice: product ? `${product.exportPrice}` : "",
      discount: product ? `${product.discount}` : "",
      categoryId: product ? `${product.category?.id}` : "",
    },
  });

  useEffect(() => {
    if (product) {
      setCurentProductImage(product.image);
      if (product.status === 2) {
        setCheckBoxIsActive(true);
      }
    }
  }, [product]);

  function onSubmit(values: z.infer<typeof selectedSchema>) {
    const productFormData = new FormData();
    if (!isEdit) {
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          const value = values[key as keyof typeof values];
          if (value) {
            if (key === "status") continue;
            if (key === "image") {
              productFormData.append("file", value[0]);
            } else {
              productFormData.append(key, value);
            }
          }
        }
      }

      submitAction && submitAction(productFormData);
    } else {
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          const value = values[key as keyof typeof values];
          if (value && key !== "status") {
            if (key === "image") {
              productFormData.append("file", value[0]);
            } else {
              if (key === "categoryId") {
                productFormData.append("cateId", value);
              } else {
                productFormData.append(key, value);
              }
            }
          }
        }
      }
      if (checkBoxIsActive) {
        productFormData.append("status", "2");
      } else {
        productFormData.append("status", "0");
      }
      submitEditAction && submitEditAction(productFormData, product?.id);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên sản phẩm"
                      {...field}
                      id="name"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá nhập (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập giá nhập"
                      {...field}
                      id="import-price"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exportPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá bán (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập giá bán"
                      {...field}
                      id="export-price"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giảm giá (%) (*)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập phần trăm giảm giá"
                      {...field}
                      id="export-price"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEdit && (
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel>
                      <label
                        htmlFor="isActive"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ngừng kinh doanh
                      </label>
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        disabled={product?.status === 2}
                        id="isActive"
                        className="!mt-0 ml-2"
                        checked={checkBoxIsActive}
                        onCheckedChange={() => {
                          if (field.value === "1") {
                            setCheckBoxIsActive(true);
                            return field.onChange("2");
                          }
                          setCheckBoxIsActive(false);
                          return field.onChange("1");
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <img
              alt="preview image"
              src={
                currentProductImage === ""
                  ? NoImagePreload
                  : currentProductImage
              }
              className="mb-2 mt-8 block h-28 w-28 rounded-md object-contain"
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Chọn hình ảnh từ máy {isEdit ? "(Đã có)" : "(*)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="image"
                      type="file"
                      value={undefined}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          setCurentProductImage(URL.createObjectURL(files[0]));
                          field.onChange(files);
                        }
                      }}
                      className="dark:file:text-violet-400"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Danh mục sản phẩm (*)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn một danh mục sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => {
                        return (
                          <SelectItem value={`${item.id}`} key={item.id}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isLoading ? <ReloadIcon className="animate-spin" /> : "Xác nhận"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
