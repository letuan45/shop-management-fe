import {
  PlusCircledIcon,
  MinusCircledIcon,
  CrossCircledIcon,
  CheckIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { currencyFormat } from "@/lib/utils";

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  detailId?: number;
  importPrice?: number;
  exportPrice?: number;
}

interface Props {
  item: IOrderItem;
  isForUpdate?: boolean;
  isRemoving?: boolean;
  defaultValue?: number;
  minusOneIsLoading?: boolean;
  plusOneIsLoading?: boolean;
  changeQtyValIsLoading?: boolean;
  onPlusOne?: (orderItemId: number) => void;
  onMinusOne?: (orderItemId: number) => void;
  onChangeQtyVal?: (orderItemId: number, value: number) => void;
  onRemoveOrderItem: (orderItemId: number) => void;
  onChangeQuantity?: (orderItemId: number, quantity: number) => void;
}

const OrderItem = ({
  item,
  onRemoveOrderItem,
  onChangeQuantity,
  defaultValue,
  isForUpdate,
  isRemoving,
  onPlusOne,
  onMinusOne,
  minusOneIsLoading,
  plusOneIsLoading,
  onChangeQtyVal,
  changeQtyValIsLoading,
}: Props) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (defaultValue) {
      setQuantity(defaultValue);
    }
  }, [defaultValue]);

  // On change quantity
  useEffect(() => {
    if (onChangeQuantity) onChangeQuantity(item.id, quantity);
  }, [quantity, item, onChangeQuantity]);

  const plusOneQty = () => {
    if (isForUpdate && onPlusOne && item.detailId) {
      onPlusOne(item.detailId);
      return;
    }

    setQuantity((oldState) => oldState + 1);
  };

  const minusOneQty = () => {
    if (isForUpdate && onMinusOne && item.detailId) {
      onMinusOne(item.detailId);
      return;
    }

    if (quantity === 1) return;
    setQuantity((oldState) => oldState - 1);
  };

  const removeOrderItemHandler = (orderId: number) => {
    onRemoveOrderItem(orderId);
  };

  return (
    <li key={item.id}>
      <Card className="flex">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-11 rounded-bl-xl rounded-tl-xl object-cover"
        />
        <div className="flex w-full justify-between p-2">
          <div className="flex flex-col justify-between">
            <div className="ml-2 line-clamp-1 w-36">
              <h4 className="text-sm font-semibold">{item.name}</h4>
            </div>
            <div className="relative flex items-center">
              <button onClick={plusOneQty} disabled={plusOneIsLoading}>
                <PlusCircledIcon />
              </button>
              <Input
                value={quantity}
                onChange={(e) => {
                  if (typeof +e.target.value !== "number") {
                    return;
                  }
                  setQuantity(+e.target.value);
                }}
                className={`mx-1 max-h-6 ${isForUpdate ? "max-w-20 !pr-8" : "max-w-12"} p-1 text-center text-sm font-semibold`}
              />
              {isForUpdate && (
                <Button
                  disabled={changeQtyValIsLoading}
                  onClick={() => {
                    onChangeQtyVal &&
                      item.detailId &&
                      onChangeQtyVal(item.detailId, quantity);
                  }}
                  className="absolute left-[4.1rem] h-5 p-2 !py-0"
                >
                  {changeQtyValIsLoading ? (
                    <ReloadIcon className="animate-spin" />
                  ) : (
                    <CheckIcon />
                  )}
                </Button>
              )}
              <button onClick={minusOneQty} disabled={minusOneIsLoading}>
                <MinusCircledIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between pr-2">
            <button
              disabled={isRemoving}
              className={`ml-auto ${isRemoving ? "cursor-not-allowed" : ""}`}
              onClick={() => {
                removeOrderItemHandler(item.id);
              }}
            >
              <CrossCircledIcon
                width={20}
                height={20}
                className={` ${isRemoving ? "text-slate-400" : "text-red-600"}`}
              />
            </button>
            <span className="text-sm">
              {item.importPrice &&
                `Đơn giá: ${currencyFormat(item.importPrice)}VND`}
              {item.exportPrice &&
                `Đơn giá: ${currencyFormat(item.exportPrice)}VND`}
            </span>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default OrderItem;
