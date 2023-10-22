import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { SetQuantity } from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface Props {
  item: CartProductType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { handleRemoveFromCart, handleCartQtyIncrease, handleCartQtyDecrease } =
    useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="flex col-span-2 justify-self-start gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImage.image}
              alt={item.name}
              fill
              className=" object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.name}`}>
            {item.name.length < 30
              ? item.name
              : item.name.substring(0, 24) + "..."}
          </Link>

          <div>{item.selectedImage.color}</div>

          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-start">{formatPrice(item.price)}</div>

      <div className=" justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>

      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};
