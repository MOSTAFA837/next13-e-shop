"use client";

import { useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { MdCheckCircle } from "react-icons/md";
import { CartProductType, SelectedImgType } from "@/utils/types";
import { SetColor } from "./SetColor";
import { SetQuantity } from "./SetQuantity";
import { Button } from "../Button";
import { ProductImage } from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface Props {
  product: any;
}

export default function ProductDetails({ product }: Props) {
  const { id, name, description, category, brand, price } = product;
  const { cartProducts, handleAddToCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id,
    name,
    description,
    category,
    brand,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts?.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

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

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return (cartProduct.quantity = 1);
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />

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

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to your cart.</span>
            </p>
            <div>
              <Button
                label="View cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />

            <hr className=" my-2" />

            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />

            <hr className=" my-2" />

            <Button
              label="Add to cart"
              onClick={() => handleAddToCart(cartProduct)}
            />
          </>
        )}
      </div>
    </div>
  );
}
