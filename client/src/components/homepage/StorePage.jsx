import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const { userId } = useParams();
  const [vendor, setVendor] = useState({});
  const getVendor = async () => {
    try {
      const res = await fetch("/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setVendor({ ...data });
      } else {
        console.log("🚀 ~ file: Product.jsx:38 ~ getVendor ~ data");
        console.log(data);
        console.log("Failed to fetch Data");
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

  const getProducts = async () => {
    try {
      const res = await fetch("/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
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

  useEffect(() => {
    getVendor();
    getProducts();
  }, []);

  return (
    <>
      <div className='mt-28 mb-16'>
        <section className='text-gray-600 body-font'>
          <div className='sm:w-full text-center sm:pr-8 sm:py-8'>
            <div className='inline-flex items-center justify-center'>
              <img
                alt={vendor.dp}
                src={`../users/${vendor.dp ? vendor.dp : "placeholder.png"}`}
                className='w-56 h-56 rounded-full flex-shrink-0 object-cover object-center'
              />
            </div>
            <div className='flex flex-col items-center text-center justify-center'>
              <h2 className='font-medium title-font mt-4 text-gray-900 text-lg'>
                {vendor.name}
              </h2>
              <div className='w-12 h-1 bg-indigo-500 rounded mt-2 mb-4' />
              <p className='text-base'>{vendor.email}</p>
            </div>
          </div>
        </section>

        <div className='flex flex-wrap w-10/12 my-0 mx-auto'>
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
};

export default StorePage;
