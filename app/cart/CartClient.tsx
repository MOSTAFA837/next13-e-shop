"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/utils/formatPrice";

export default function CartClient() {
  const [mounted, setMounted] = useState(false);
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const localStorageItems = localStorage.getItem("cartItems");

  if (!cartProducts || cartProducts.length < 1 || !localStorageItems) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping cart" center />

      <div className="grid grid-cols-5 text-sm pb-2 pt-8 items-center">
        <div className="col-span-2 justify-self-center">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-center">Total</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts?.map((item) => <CartItem key={item.id} item={item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Clear cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>

        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>

          <p className=" text-slate-50">
            taxes and shipping are calculate at checkout
          </p>

          <Button label="Checkout" onClick={() => {}} />

          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
