import React from "react";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  return (
    <>
      {/* <h1>ITEM</h1> */}
      <div className='lg:basis-1/5 md:basis-1/3 flex hover:scale-[1.02] transform transition duration-300  hover:drop-shadow-lg'>
        <NavLink to={"/product"} state={props.product}>
          <div className='flex flex-col items-center m-2 w-52'>
            {props.product.quantity ? (
              <img
                src={"../products/" + props.product.image}
                className='h-36'
                alt='Not Found'
                loading='lazy'
              />
            ) : (
              <>
                <div className='relative h-36'>
                  <div className=' brightness-50'>
                    <img
                      src={"../products/" + props.product.image}
                      className='h-36 '
                      alt='Not Found'
                      loading='lazy'
                    />
                  </div>
                  <div className='absolute top-1/3 left-1/4'>
                    <p className='text-red-500 font-bold text-3xl'>Sold Out</p>
                  </div>
                </div>
              </>
            )}

            <div className='w-full'>
              <div className='h-12'>
                <p>{props.product.title}</p>
              </div>

              <div className='flex justify-around '>
                <p className='text-lg font-medium text-[#F85606]'>
                  ${props.product.price}
                </p>
                {props.product.quantity ? (
                  <p className=''>{props.product.quantity} available</p>
                ) : (
                  <p className=' text-red-600'>Out of Stock </p>
                )}
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Card;
