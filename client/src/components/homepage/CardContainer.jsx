import React from "react";
import CardComponent from "./Card";
import { useContext } from "react";
import { ProductsContext } from "../../services/ProductContext";
const CardContainer = () => {
  const { products, setProducts } = useContext(ProductsContext);
  return (
    <>
      <div className='flex flex-wrap w-10/12 mb-20 mx-auto'>
        {products.map((item) => {
          return (
            <>
              <CardComponent product={item}></CardComponent>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CardContainer;
