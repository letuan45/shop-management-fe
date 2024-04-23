import { supplierSchema } from "@/lib/utils/schemas/supplierSchema";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ICreateSupplier, ISupplier } from "@/interfaces/supplier";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  onSubmitCreate?: (data: ICreateSupplier) => void;
  onSubmitEdit?: (data: ICreateSupplier, supplierId: number) => void;
  isLoading: boolean;
  isEdit?: boolean;
  supplier?: ISupplier | undefined;
}

const SupplierForm = ({
  onSubmitCreate,
  isLoading,
  supplier,
  isEdit,
  onSubmitEdit,
}: Props) => {
  const form = useForm<z.infer<typeof supplierSchema>>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier ? supplier.name : "",
      address: supplier ? supplier.address : "",
      email: supplier ? supplier.email : "",
      phone: supplier ? supplier.phone : "",
    },
  });

  function onSubmit(values: z.infer<typeof supplierSchema>) {
    if (isEdit && supplier) {
      onSubmitEdit && onSubmitEdit(values, supplier.id);
      return;
    }
    onSubmitCreate && onSubmitCreate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full max-sm:grid-cols-1 max-sm:gap-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên nhà cung cấp (*)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền tên nhà cung cấp"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (*)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền đúng định dạng email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại (*)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Số điện thoại ít nhất 10 chữ số"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ (*)</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-28 max-sm:min-h-12"
                    {...field}
                    placeholder="Nhập địa chỉ"
                    id="address"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit">
            {isLoading ? <ReloadIcon className="animate-spin" /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SupplierForm;
