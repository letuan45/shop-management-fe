import { IProduct } from "@/interfaces/product";
import { Card } from "../ui/card";
import {
  MinusCircledIcon,
  PaperPlaneIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { currencyFormat } from "@/lib/utils";

interface Props {
  item: IProduct;
  onChooseItem: (
    productId: number,
    quantity: number,
    name: string,
    image: string,
    price: number,
  ) => void;
  isActive: boolean;
  isForSell?: boolean;
}

const ProductOrderItem = ({
  item,
  onChooseItem,
  isActive,
  isForSell,
}: Props) => {
  const [quantity, setQuantity] = useState(1);

  const chooseItemHandler = (
    productId: number,
    quantity: number,
    name: string,
    image: string,
    price: number,
  ) => {
    onChooseItem(productId, quantity, name, image, price);
  };

  const plusOneQty = () => {
    setQuantity((oldState) => oldState + 1);
  };

  const minusOneQty = () => {
    if (quantity === 1) return;
    setQuantity((oldState) => oldState - 1);
  };

  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Card className="cursor-pointer p-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-32 w-full rounded-md"
          />
          <h3 className="mb-3 mt-2 line-clamp-1 text-sm font-semibold">
            {item.name}
          </h3>
          <div className="flex justify-between gap-2">
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
            <Button
              className={`px-3 ${!isActive ? "cursor-not-allowed !bg-slate-500 opacity-75" : ""}`}
              onClick={() => {
                const price = isForSell ? item.exportPrice : item.importPrice;
                chooseItemHandler(
                  item.id,
                  quantity,
                  item.name,
                  item.image,
                  price,
                );
              }}
            >
              <PaperPlaneIcon />
            </Button>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-56">
        <div className="text-sm font-semibold">
          {isForSell ? "Giá bán: " : "Giá nhập: "}
          <span className="ml-1 text-primary">
            {item.importPrice &&
              !isForSell &&
              `${currencyFormat(item.importPrice)}VND`}
            {item.exportPrice &&
              isForSell &&
              `${currencyFormat(item.exportPrice)}VND`}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProductOrderItem;
