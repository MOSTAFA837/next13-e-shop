import { CartProductType } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItems");
    const cartProducts: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(cartProducts);
  }, []);

  const handleAddToCart = (product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to your cart");
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleRemoveFromCart = (product: CartProductType) => {
    if (cartProducts) {
      const filteredProducts = cartProducts.filter((item) => {
        return item.id !== product.id;
      });

      setCartProducts(filteredProducts);
      toast.success("product removed from your cart");
      localStorage.setItem("cartItems", JSON.stringify(filteredProducts));
    }
  };

  const handleCartQtyIncrease = (product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 99) {
      return toast.error("Ooops! Maximum reached.");
    }

    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
          .quantity;
      }

      setCartProducts(updatedCart);

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const handleCartQtyDecrease = (product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 1) {
      return;
    }

    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
          .quantity;
      }

      setCartProducts(updatedCart);

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        setCartTotalAmount(total);
        setCartTotalQty(qty);
      }
    };

    getTotal();
  }, [cartProducts]);

  const handleClearCart = () => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("cartItems", JSON.stringify(null));
  };

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider.");
  }

  return context;
};
