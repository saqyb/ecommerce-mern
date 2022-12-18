import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import CardContainer from "./CardContainer";
import Carousel from "./Carousel";
import NoDataUI from "../error/NoDataUI";
import Card from "./Card";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const getProducts = async () => {
    try {
      const res = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: location.state,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        const arr = [...data];
        setProducts([...arr]);
        console.log(products);
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

  useEffect(() => {
    setProducts([]);
    getProducts();
  }, [location.state]);

  if (products.length > 0)
    return (
      <>
        <div className='mt-32 w-10/12 my-0 mx-auto'>
          <div>
            <p className='text-xl font-normal'>
              Showing Results for {location.state}
            </p>
          </div>
          <div className='flex flex-wrap'>
            {products.map((item) => {
              return (
                <>
                  <Card product={item}></Card>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className='mt-32'>
          <div className='flex flex-wrap w-10/12 my-0 mx-auto'>
            <NoDataUI></NoDataUI>
          </div>
        </div>
      </>
    );
};

export default SearchPage;
