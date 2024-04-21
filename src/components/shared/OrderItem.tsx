import {
  PlusCircledIcon,
  MinusCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
}

interface Props {
  item: IOrderItem;
  onRemoveOrderItem: (orderItemId: number) => void;
  onChangeQuantity: (orderItemId: number, quantity: number) => void;
}

const OrderItem = ({ item, onRemoveOrderItem, onChangeQuantity }: Props) => {
  const [quantity, setQuantity] = useState(1);

  // On change quantity
  useEffect(() => {
    onChangeQuantity(item.id, quantity);
  }, [quantity, item, onChangeQuantity]);

  const plusOneQty = () => {
    setQuantity((oldState) => oldState + 1);
  };

  const minusOneQty = () => {
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
          className="h-full w-11 rounded-bl-xl rounded-tl-xl"
        />
        <div className="flex flex-col justify-between p-2">
          <div className="ml-2 line-clamp-1 w-36">
            <h4 className="text-sm font-semibold">{item.name}</h4>
          </div>
          <div className="flex items-center">
            <button onClick={plusOneQty}>
              <PlusCircledIcon />
            </button>
            <Input
              value={quantity}
              onChange={(e) => {
                setQuantity(+e.target.value);
              }}
              className="mx-1 max-h-6 max-w-12 p-1 text-center text-sm font-semibold"
            />
            <button onClick={minusOneQty}>
              <MinusCircledIcon />
            </button>
          </div>
        </div>
        <button
          className="ml-auto mr-4"
          onClick={() => {
            removeOrderItemHandler(item.id);
          }}
        >
          <CrossCircledIcon width={20} height={20} className="text-red-600" />
        </button>
      </Card>
    </li>
  );
};

export default OrderItem;
