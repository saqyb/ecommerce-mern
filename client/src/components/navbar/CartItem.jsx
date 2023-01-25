import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../services/UserContext";
import { CartContext } from "../../services/CartContext";
import { ProductsContext } from "../../services/ProductContext";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalTest from "./ModalTest";
import { Button, Modal } from "antd";
const IncBool = (props) => {
  const { Cart, dispatch } = useContext(CartContext);

  const { product, item } = props;
  const soldOutToast = () => {
    toast.error("🦄 Wow so easy!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  if (item.quantity < product.quantity) {
    return (
      <>
        <button
          type='button'
          class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={() => {
            dispatch({ type: "Inc", payload: item });
          }}
        >
          +
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          type='button'
          class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={() => {
            toast.error("Sold Out", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }}
        >
          +
          <ToastContainer
            position='bottom-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </button>
      </>
    );
  }
};

const CartItem = (props) => {
  const { item, product } = props;
  const { Cart, dispatch } = useContext(CartContext);
  const [modalOn, setModalOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalHandler = () => {
    setModalOn(!modalOn);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (payload) => {
    dispatch({ type: "Delete", payload: item });
    removeFromCartToast();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const removeFromCartToast = () => {
    toast.warn("Product Removed from Cart", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div>
        <Modal
          title='Remove Product'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <button
              className='rounded-md m-4 bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'
              onClick={handleCancel}
            >
              Cancel
            </button>,
            <button
              className='rounded-md m-4 bg-blue-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'
              onClick={handleOk}
            >
              Okay
            </button>,
          ]}
        >
          <p className='text-lg font-medium leading-6 text-gray-900'>
            {product.title} will be removed from Cart
          </p>
          <p className='text-sm text-gray-500'>
            Are you sure you want to remove {product.title}
            from your Cart. This action cannot be undone.
          </p>
        </Modal>

        <div className='flex border-b items-center h-32 hover:bg-gray-100 -mx-8 px-6 py-5'>
          <div
            className='flex w-2/5 h-32 justify-center 
                items-center'
          >
            <NavLink to={"/product"} state={product}>
              <div className='w-20 h-14'>
                <img
                  className='h-auto'
                  src={`products/${product.image}`}
                  alt=''
                />
              </div>
            </NavLink>

            <div className='flex flex-col justify-between ml-4 flex-grow'>
              <NavLink to={"/product"} state={product}>
                <span className='font-bold text-sm'>{product.title}</span>
              </NavLink>
              <span className='text-red-500 text-xs'>
                {/* {product.brand} */}
              </span>
              <a
                className='font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs'
                onClick={() => {
                  showModal(item);
                  // dispatch({ type: "Delete", payload: item });
                }}
              >
                {modalOn && (
                  <ModalTest
                    payload={item}
                    product={product}
                    modal={modalHandler}
                  ></ModalTest>
                )}
                <ToastContainer
                  position='bottom-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='colored'
                />
                Remove
              </a>
            </div>
          </div>
          <div className='flex justify-center w-1/5'>
            <button
              type='button'
              class='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
              onClick={() => {
                if (item.quantity == 1) {
                  // removeFromCartToast();
                  showModal(item);

                  // dispatch({ type: "Delete", payload: item });
                } else {
                  // modalHandler();
                  dispatch({ type: "Dec", payload: item });
                }
              }}
            >
              <ToastContainer
                position='bottom-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
              />
              -
            </button>
            <p className='text-xl pl-5 pr-6'>{item.quantity}</p>
            <IncBool product={product} item={item} />
          </div>

          <span className='text-center w-1/5 font-semibold text-sm'>
            {product.price}
          </span>
          <span className='text-center w-1/5 font-semibold text-sm'>
            {product.price * item.quantity}
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
