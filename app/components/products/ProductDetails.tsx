"use client";

import { useCallback, useState } from "react";
import { Rating } from "@mui/material";
import { CartProductType, SelectedImgType } from "@/utils/types";
import { SetColor } from "./SetColor";

interface Props {
  product: any;
}

export default function ProductDetails({ product }: Props) {
  const { id, name, description, category, brand, quantity, price } = product;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id,
    name,
    description,
    category,
    brand,
    selectedImage: { ...product.images[0] },
    quantity,
    price,
  });

  const ratings =
    product.reviews.reduce((acc: number, curr: any) => curr.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImage: value };
      });
    },
    [cartProduct.selectedImage]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>Images</div>

      <div className="flex flex-col gap-1 text-sm">
        <h2 className="text-3xl font-semibold text-black/80">{product.name}</h2>

        <div className="flex items-center gap-2">
          <Rating value={ratings} readOnly />
          <p>{product.reviews.length} Reviews</p>
        </div>

        <hr className=" my-2" />

        <div className="text-justify">{product.description}</div>

        <hr className=" my-2" />

        <div>
          <span className="font-semibold mr-2">Category:</span>
          {product.category}
        </div>

        <div>
          <span className="font-semibold mr-2">Brand:</span>
          {product.brand}
        </div>

        <div>
          <span className={`font-semibold mr-2 `}>Availablity:</span>
          <span className={product.inStock ? "text-teal-600" : "text-rose-600"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <hr className=" my-2" />

        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />

        <hr className=" my-2" />

        <div>Quantity</div>

        <hr className=" my-2" />

        <div>Add to cart</div>
      </div>
    </div>
  );
}
