import { ICartItem } from "@/interfaces/cart";
import { Card } from "../ui/card";
import { currencyFormat, queryClient } from "@/lib/utils";
import {
  CheckIcon,
  CrossCircledIcon,
  MinusCircledIcon,
  PlusCircledIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  minusCartByOne,
  plusCartByOne,
  removeCartItem,
  updateCartQuantity,
} from "@/services/cartService";
import { toast } from "../ui/use-toast";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  item: ICartItem;
}

const SellingCartItem = ({ item }: Props) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item.quantity) {
      setQuantity(item.quantity);
    }
  }, [item.quantity]);

  const { mutate: removeAction, isPending: removeIsPending } = useMutation({
    mutationKey: ["remove-cart-item"],
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Xóa chi tiết giỏ hàng thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: plusOneAction, isPending: plusOneIsLoading } = useMutation({
    mutationKey: ["plus-cart-item"],
    mutationFn: plusCartByOne,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa tiết giỏ hàng thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: minusOneAction, isPending: minusOneIsLoading } = useMutation({
    mutationKey: ["minus-cart-item"],
    mutationFn: minusCartByOne,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa tiết giỏ hàng thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateQtyAction, isPending: updateQtyIsLoading } =
    useMutation({
      mutationKey: ["update-qty-cart-item"],
      mutationFn: updateCartQuantity,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa tiết giỏ hàng thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["get-cart"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const plusOneHandler = () => {
    plusOneAction({ productId: item.product.id });
  };

  const minusOneHandler = () => {
    minusOneAction({ productId: item.product.id });
  };

  const onSaveQuantity = () => {
    updateQtyAction({ productId: item.product.id, quantity });
  };

  const removeHandler = () => {
    removeAction({ cartItemId: item.id });
  };

  return (
    <Card className="flex p-3">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex w-full justify-between gap-2 py-2 pl-2 text-sm">
        <div className="flex w-1/2 flex-col justify-between">
          <h3 className="text-md line-clamp-1 font-semibold">
            {item.product.name}
          </h3>
          <h4 className="italic text-slate-400"> Tồn: {item.product.stock}</h4>
          <h4>Giá: {currencyFormat(item.product.exportPrice)}Đ</h4>
        </div>
        <div className="flex w-1/2 flex-col justify-between">
          <button
            onClick={removeHandler}
            disabled={false}
            className="flex justify-end text-red-600"
          >
            {removeIsPending ? (
              <ReloadIcon />
            ) : (
              <CrossCircledIcon width={20} height={20} />
            )}
          </button>
          <div className="relative flex items-center justify-end">
            <button onClick={plusOneHandler} disabled={plusOneIsLoading}>
              <PlusCircledIcon width={20} height={20} />
            </button>
            <div className="relative">
              <Input
                value={quantity}
                onChange={(e) => {
                  if (typeof +e.target.value !== "number") {
                    return;
                  }
                  setQuantity(+e.target.value);
                }}
                className="text-md mx-1 max-w-16 p-1 !pr-8 text-center font-semibold"
              />
              <Button
                disabled={false}
                onClick={onSaveQuantity}
                className="absolute left-full top-1/2 h-7 -translate-x-[120%] -translate-y-1/2 p-2 !py-0"
              >
                {updateQtyIsLoading ? <LoadingIndicator /> : <CheckIcon />}
              </Button>
            </div>

            <button onClick={minusOneHandler} disabled={minusOneIsLoading}>
              <MinusCircledIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SellingCartItem;
