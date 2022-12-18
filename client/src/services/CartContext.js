import { useState } from "react";
import { createContext } from "react";
import { useReducer } from "react";
const initialState = {
  productIds: [],
  totalPrice: 0,
};

const reducer = (Cart, { type, payload }) => {
  if (type === "Add") {
    const checkCart = Cart.productIds.find((item) => item.id === payload.id);
    if (!checkCart) {
      return {
        ...Cart,
        productIds: [
          ...Cart.productIds,
          { id: payload.id, quantity: 1, price: payload.price },
        ],
        totalPrice: Cart.totalPrice + payload.price,
      };
      // console.log(checkCart);
    } else {
      console.log("Empty");
      return Cart;
    }
  } else if (type === "Delete") {
    const index = Cart.productIds.indexOf(payload);
    console.log("index: " + index);
    const updatedIds = [...Cart.productIds];
    updatedIds.splice(index, 1);
    const payloadPrice = payload.price * payload.quantity;
    const updatedTotalPrice = Cart.totalPrice - payloadPrice;
    return { productIds: updatedIds, totalPrice: updatedTotalPrice };
  } else if (type === "Inc") {
    const index = Cart.productIds.indexOf(payload);
    const quantity = payload.quantity + 1;
    const update = { ...payload, quantity: quantity };
    const updatedIds = [...Cart.productIds];
    updatedIds.splice(index, 1, update);
    const updatedPrice = Cart.totalPrice + payload.price;
    return {
      productIds: updatedIds,
      totalPrice: updatedPrice,
    };
  } else if (type === "Dec") {
    if (payload.quantity == 0) {
      return Cart;
    } else {
      const index = Cart.productIds.indexOf(payload);
      const quantity = payload.quantity - 1;
      const update = { ...payload, quantity: quantity };
      const updatedIds = [...Cart.productIds];
      updatedIds.splice(index, 1, update);
      const updatedPrice = Cart.totalPrice - payload.price;
      return {
        productIds: updatedIds,
        totalPrice: updatedPrice,
      };
    }
  } else if (type === "Empty") {
    return {
      productIds: [],
      totalPrice: 0,
    };
  }
};

export const CartContext = createContext({ initialState });

export const CartProvider = ({ children }) => {
  const [Cart, dispatch] = useReducer(reducer, initialState);
  const value = { Cart, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
