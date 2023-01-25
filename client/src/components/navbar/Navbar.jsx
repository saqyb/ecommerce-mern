import React from "react";
import Cart from "./Cart";
import { useContext, useEffect } from "react";
import { userContext } from "../../services/UserContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ProductsContext } from "../../services/ProductContext";
import { CategoriesContext } from "../../services/CategoriesContext";
import { CartContext } from "../../services/CartContext";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const { Cart, dispatch } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const callHome = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        setCurrentUser(data);
        // console.log(currentUser);
      } else if (res.status !== 200) {
        setCurrentUser(null);
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
      // navigate("/login");
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch("/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        const arr = [...data];
        setProducts([...arr]);
        // console.log(products);
      } else {
        console.log("Failed to fetch Products");
      }
      // console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        const arr = [...data];
        setCategories([...arr]);
        // console.log(categories);
      } else {
        console.log("Failed to fetch Categories");
      }
      // console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    callHome();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {};
  const userCondition = () => {
    // console.log("user Nav");
    if (!currentUser) {
      return (
        <>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink to={"/"}>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Home
                  </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Login
                  </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Sign Up
                  </a>
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink to={"/logout"}>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Logout
                  </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard"}>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    {currentUser.name}
                  </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/cart"}>
                  <p class='inline-flex relative '>
                    <span>Cart</span>
                    {Cart.productIds.length > 0 ? (
                      <div class='inline-flex absolute -top-2 -right-6 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900'>
                        {Cart.productIds.length}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </p>
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <nav className='bg-white drop-shadow-sm fixed top-0 w-full z-10 border-b border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <NavLink to={"/"}>
            <div className='flex items-center'>
              <img
                src='https://flowbite.com/docs/images/logo.svg'
                className='mr-3 h-6 sm:h-9'
                alt='Flowbite Logo'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Ecommerce
              </span>
            </div>
          </NavLink>
          <div className='flex items-center w-[600px]'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                value={search}
                onChange={handleInput}
                type='text'
                id='simple-search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0'
                placeholder='Search'
                required=''
              />
            </div>
            <NavLink to={"/search"} state={search}>
              <button
                type='button'
                onClick={handleSearch}
                className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                <span className='sr-only'>Search</span>
              </button>
            </NavLink>
          </div>
          <div>
            <div class='group inline-block relative'>
              <button class='w-52 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
                <span class='mr-1'>Select Category ↓</span>
              </button>
              <ul class='w-52 absolute hidden text-gray-700 pt-1 group-hover:block'>
                {categories.map((item) => {
                  return (
                    <>
                      <NavLink to={`category/${item.id}`}>
                        <button
                          value={item.id}
                          class='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'
                        >
                          <li>{item.name}</li>
                        </button>
                      </NavLink>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          {userCondition()}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
