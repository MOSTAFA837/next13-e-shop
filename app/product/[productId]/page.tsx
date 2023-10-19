import { Container } from "@/app/components/Container";
import { ListRatings } from "@/app/components/products/ListRatings";
import ProductDetails from "@/app/components/products/ProductDetails";
import { products } from "@/utils/products";
import React from "react";

interface Props {
  productId?: string;
}

export default function page({ params }: { params: Props }) {
  const product = products[2];

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />

        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>

          <ListRatings product={product} />
        </div>
      </Container>
    </div>
  );
}
