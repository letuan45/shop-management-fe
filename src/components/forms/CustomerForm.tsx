import { ICreateCustomer, ICustomer } from "@/interfaces/customer";
import { customerSchema } from "@/lib/utils/schemas/customerSchema";
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
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  onSubmitCreate?: (data: ICreateCustomer) => void;
  onSubmitEdit?: (data: ICreateCustomer, customerId: number) => void;
  isLoading: boolean;
  isEdit?: boolean;
  customer?: ICustomer | undefined;
}

const CustomerForm = ({
  onSubmitCreate,
  isLoading,
  customer,
  isEdit,
  onSubmitEdit,
}: Props) => {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer ? customer.name : "",
      phone: customer ? customer.phone : "",
    },
  });

  function onSubmit(values: z.infer<typeof customerSchema>) {
    if (isEdit && customer) {
      onSubmitEdit && onSubmitEdit(values, customer.id);
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
                <FormLabel>Tên khách hàng (*)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền tên khách hàng"
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

export default CustomerForm;
