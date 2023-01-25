import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../services/CartContext";
import { userContext } from "../../services/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../services/CategoriesContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { Cart, dispatch } = useContext(CartContext);
  const [category, setCategory] = useState({});
  const { categories } = useContext(CategoriesContext);
  const { currentUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state: product } = location;
  const CartObj = Cart.productIds.find((obj) => obj.id == location.state.id);
  let btn;
  if (currentUser) {
    if (CartObj) btn = "Remove from Cart";
    else btn = "Add to Cart $" + product.price;
  } else btn = "Login to Buy";

  const [vendor, setVendor] = useState({});
  const getVendor = async () => {
    try {
      const res = await fetch("/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.userId,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setVendor({ ...data });
      } else {
        console.log(data);
        console.log("Failed to fetch Data");
      }
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCategory = async () => {
    const cat = categories.find((item) => {
      return item.id === product.categoryId;
    });
    setCategory(cat);
  };

  const soldToast = () => {
    toast.error("This Product is Sold Out", {
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

  const alreadyInCartToast = () => {
    toast.error("Product Already in Cart", {
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

  const addToCart = () => {
    toast.success("Added to Cart", {
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

  useEffect(() => {
    getCategory();
    getVendor();
  }, []);

  if (product)
    return (
      <div className='w-10/12 my-24 mx-auto flex'>
        <div className='w-1/2'>
          <img
            src={
              product.image
                ? `products/${product.image}`
                : "media/placeholder.jpg"
            }
            alt=''
          />
        </div>
        <div className='w-1/2 flex flex-col'>
          <div className='mx-10'>
            <h1 className='text-3xl'>{product.title}</h1>
            <NavLink to={`../category/${category.id}`}>
              <div class='bg-blue-100 text-blue-800 text-base inline-block font-semibold mt-3 mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                {category.name}
              </div>
            </NavLink>
            <p className='pt-5 text-xl font-medium text-orange-500'>
              Price: ${product.price}
            </p>
            {product.quantity ? (
              <p className='pt-5'>
                {product.quantity} units available in stock
              </p>
            ) : (
              <p className='pt-5 text-red-600 font-bold'>Out of Stock </p>
            )}
          </div>
          <div className='mx-10 mt-5'>
            <NavLink to={`/store/${vendor.id}`}>
              <a className='inline-flex items-center'>
                <img
                  alt={vendor.name}
                  src={`${
                    vendor.dp ? "users/" + vendor.dp : "media/placeholder.png"
                  }`}
                  className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                />
                <span className='flex-grow flex flex-col pl-4'>
                  <span className='title-font font-medium text-gray-900'>
                    {vendor.name}
                  </span>
                  <span className='text-gray-400 text-xs tracking-widest mt-0.5'></span>
                </span>
              </a>
            </NavLink>
          </div>
          <div className='w-9/12 mx-10 mt-5'>
            <p>
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. ullam amet voluptatum.
            </p>
          </div>
          <div className='mt-5'>
            {product.quantity < 1 ? (
              <>
                <button
                  onClick={soldToast}
                  class='m-10 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md'
                >
                  Sold Out
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
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (currentUser) {
                      if (CartObj) {
                        alreadyInCartToast();
                      } else {
                        addToCart();
                        dispatch({ type: "Add", payload: location.state });
                      }
                    } else navigate("/login");
                  }}
                  class='m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
                >
                  Add to Cart
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
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  else
    return (
      <>
        <div className='mt-28'>Loading...</div>
      </>
    );
};

export default Product;
