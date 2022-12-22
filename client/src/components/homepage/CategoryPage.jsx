import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NoDataUI from "../error/NoDataUI";
import Card from "./Card";
import { CategoriesContext } from "../../services/CategoriesContext";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { itemId } = useParams();
  const [category, setCategory] = useState({});
  const { categories, setCategories } = useContext(CategoriesContext);
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
    const cat = categories.find((item) => {
      return item.id === itemId;
    });
    setCategory(cat);
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
        <div className='my-16'>
          <div className='relative w-full '>
            <div
              className={`h-72 w-full bg-fixed brightness-75 bg-cover bg-center bg-[url(../../categories/${category.image})]`}
            ></div>
            <div className='absolute top-1/3 w-full my-0 mx-auto'>
              <p className='text-6xl text-center text-white font-bold'>
                {category.name} Category
              </p>
              <p className='text-4xl mt-9 text-center text-white font-based'>
                {products.length > 1
                  ? products.length + " Products found"
                  : products.length + " Product found"}
              </p>
            </div>
          </div>
          <div className='flex flex-wrap w-10/12 my-10  mx-auto'>
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
