import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NoDataUI from "../error/NoDataUI";
import Card from "./Card";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { itemId } = useParams();
  const [category, setCategory] = useState({});
  const getProducts = async () => {
    try {
      const res = await fetch("/productCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: itemId,
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
  const getCategory = async () => {
    try {
      const res = await fetch("/getCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setCategory(data);
        console.log(category);
        console.log("Category");
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
    setCategory({});
    getCategory();
  }, [itemId]);

  if (products.length > 0) {
    return (
      <>
        <div className='mt-32'>
          <div>
            <p className='text-xl font-normal'>{category.name} Category</p>
          </div>
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
  } else {
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

export default CategoryPage;
