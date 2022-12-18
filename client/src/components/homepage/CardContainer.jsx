import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { ProductsContext } from "../../services/ProductContext";
const CardContainer = () => {
  const { products, setProducts } = useContext(ProductsContext);
  return (
    <>
      <div className='flex flex-wrap w-10/12 mb-20 mx-auto '>
        {products.map((item) => {
          return (
            <>
              <Card product={item}></Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CardContainer;
