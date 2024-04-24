import { IProduct } from "@/interfaces/product";
import { Card } from "../ui/card";
import { currencyFormat, queryClient } from "@/lib/utils";
import { useState } from "react";
import {
  MinusCircledIcon,
  PaperPlaneIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/services/cartService";
import { toast } from "../ui/use-toast";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  item: IProduct;
  isActive: boolean;
}

const SellingProductItem = ({ item, isActive }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToCartAction, isPending: addToCartIsPending } =
    useMutation({
      mutationKey: ["add-to-cart"],
      mutationFn: addToCart,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Thêm vào giỏ hàng thành công!",
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

  const plusOneQty = () => {
    setQuantity((oldState) => oldState + 1);
  };

  const minusOneQty = () => {
    if (quantity === 1) return;
    setQuantity((oldState) => oldState - 1);
  };

  const addToCartHandler = () => {
    addToCartAction({ productId: item.id, quantity });
  };

  return (
    <Card className="px-4 pb-2 pt-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-36 w-full rounded-lg object-cover"
      />
      <div className="mt-2 text-sm">
        <h2 className="line-clamp-1 font-semibold">{item.name}</h2>
        <h3 className="line-clamp-1 font-semibold text-primary">
          Giá bán: {currencyFormat(item.exportPrice)}Đ
        </h3>
        <div className="my-2 flex w-full justify-between">
          <div className="flex items-center">
            <button onClick={plusOneQty}>
              <PlusCircledIcon />
            </button>
            <Input
              value={quantity}
              onChange={(e) => {
                setQuantity(+e.target.value);
              }}
              className="mx-1 max-h-6 max-w-7 p-1 text-center text-sm font-semibold"
            />
            <button onClick={minusOneQty}>
              <MinusCircledIcon />
            </button>
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={addToCartHandler}
                  className={`px-3 ${!isActive ? "cursor-not-allowed !bg-slate-500 opacity-75" : ""}`}
                >
                  {addToCartIsPending ? (
                    <LoadingIndicator />
                  ) : (
                    <PaperPlaneIcon />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Thêm vào giỏ hàng</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex w-full justify-between text-xs italic text-slate-600 dark:text-slate-300">
          <p>{item.category?.name}</p>
          <p>Tồn kho: {item.stock}</p>
        </div>
      </div>
    </Card>
  );
};

export default SellingProductItem;
