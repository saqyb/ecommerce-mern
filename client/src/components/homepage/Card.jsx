import React from "react";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  return (
    <>
      {/* <h1>ITEM</h1> */}
      <div className='lg:basis-1/5 md:basis-1/3 flex hover:scale-[1.02] transform transition duration-300  hover:drop-shadow-lg border-[0px] border-red-600'>
        <NavLink to={"/product"} state={props.product}>
          <div className='flex flex-col items-center m-2 border-[0px] border-[red]'>
            <img
              src={
                "../products/" + props.product.image
                // props.product.image
                //   ? `products/${props.product.image}`
                //   : "media/placeholder.jpg"
              }
              className='h-36'
              alt='Not Found'
              loading='lazy'
            />

            <div>
              <p>{props.product.title}</p>
              <p className='text-lg font-medium text-[#F85606]'>
                $ {props.product.price}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Card;
