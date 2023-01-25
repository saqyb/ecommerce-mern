import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../services/UserContext";
import { CartContext } from "../../services/CartContext";
import { ProductsContext } from "../../services/ProductContext";
import * as uuid from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataUI from "../error/NoDataUI";
import CartItem from "./CartItem";

const Cart = () => {
  const { Cart, dispatch } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { currentUser } = useContext(userContext);
  const AddOrder = async (e) => {
    e.preventDefault();
    const res = await fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuid.v4(),
        userId: currentUser.id,
        productsId: Cart.productIds,
        cost: Cart.totalPrice,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      console.log("Order Done");
      dispatch({ type: "Empty" });
      console.log(res);
    } else {
      console.log(res.status);
      console.log("Failed to Order");
      // navigate("/Login");
    }
    // // navigate("/Login");
    // console.log(Cart);
  };

  if (Cart.productIds.length > 0)
    return (
      <>
        <div className='container mx-auto mt-10'>
          <div className='flex shadow-md my-10'>
            <div className='w-3/4 bg-white px-10 py-10'>
              <div className='flex justify-between border-b pb-8'>
                <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
                <h2 className='font-semibold text-2xl'>
                  {Cart.productIds.length} Items
                </h2>
              </div>
              <div className='flex mt-10 mb-5'>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                  Product Details
                </h3>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
                  Quantity
                </h3>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
                  Price
                </h3>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
                  Total
                </h3>
              </div>
              {Cart.productIds.map((item) => {
                const product = products.find((obj) => obj.id === item.id);

                if (product) {
                  return (
                    <>
                      <CartItem item={item} product={product}></CartItem>
                    </>
                  );
                }
              })}

              <a className='flex font-semibold text-indigo-600 text-sm mt-10'>
                Continue Shopping
              </a>
            </div>
            <div id='summary' className='w-1/4 px-8 py-10'>
              <h1 className='font-semibold text-2xl border-b pb-8'>
                Order Summary
              </h1>
              <div className='flex justify-between mt-10 mb-5'>
                <span className='font-semibold text-sm uppercase'>
                  Items {Cart.productIds.length}
                </span>
                <span className='font-semibold text-sm'>{Cart.totalPrice}</span>
              </div>
              <div>
                <label className='font-medium inline-block mb-3 text-sm uppercase'>
                  Shipping
                </label>
                <select className='block p-2 text-gray-600 w-full text-sm'>
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className='py-10'>
                <label
                  htmlFor='promo'
                  className='font-semibold inline-block mb-3 text-sm uppercase'
                >
                  Promo Code
                </label>
                <input
                  type='text'
                  id='promo'
                  placeholder='Enter your code'
                  className='p-2 text-sm w-full'
                />
              </div>
              <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
                Apply
              </button>
              <div className='border-t mt-8'>
                <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                  <span>Total cost</span>
                  <span>{Cart.totalPrice}</span>
                </div>
                <button
                  onClick={AddOrder}
                  className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <div className='mt-32'>
          <div className='flex flex-wrap w-10/12 my-0 mx-auto'>
            <NoDataUI></NoDataUI>
          </div>
        </div>
      </>
    );
  }
};
export default Cart;
