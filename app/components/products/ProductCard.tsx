"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  const ratings =
    product.reviews.reduce((acc: number, curr: any) => curr.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1 justify-between h-full">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={product.images[0].image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4">
          {product.name.length < 30
            ? product.name
            : product.name.substring(0, 24) + "..."}
        </div>

        <div>
          <Rating value={ratings} readOnly />
        </div>

        <div>{product.reviews.length} Reviews</div>
        <div className="font-semibold">{formatPrice(product.price)}</div>
      </div>
    </div>
  );
}
