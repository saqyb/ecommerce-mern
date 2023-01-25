import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "antd";
import { CategoriesContext } from "../../services/CategoriesContext";

const CarouselComponent = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <>
      <Carousel autoplay autoplaySpeed={2000}>
        {categories.map((category) => {
          return (
            <>
              <div className='relative w-full'>
                <div
                  className={`h-72 w-full bg-fixed brightness-75 bg-cover bg-center bg-[url(../../categories/${category.image})]`}
                ></div>
                <NavLink to={`category/${category.id}`}>
                  <div className='absolute top-1/3 w-full my-0 mx-auto'>
                    <p className='text-6xl underline text-center text-white font-bold'>
                      {category.name} Category
                    </p>
                  </div>
                </NavLink>
              </div>
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
