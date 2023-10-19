"use client";

import { CartProductType, SelectedImgType } from "@/utils/types";

interface Props {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export const SetColor: React.FC<Props> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className=" font-semibold">Color:</span>

        <div className="flex gap-1">
          {images.map((img) => (
            <div
              onClick={() => handleColorSelect(img)}
              key={img.color}
              className={`h-7 w-7 rounded-full border-teal-700 flex items-center justify-center ${
                cartProduct.selectedImage.color === img.color
                  ? "border-[1.5px]"
                  : "border-none"
              } `}
            >
              <div
                className="h-5 w-5 rounded-full border-[1.5px] border-slate-300 cursor-pointer"
                style={{ background: img.colorCode }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
