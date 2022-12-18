import React from "react";

const Carousel = () => {
  return (
    <>
      <div className='w-10/12 carousel my-0 mx-auto'>
        {/* <img src='media/Carousel-1.jpg' alt='' /> */}
        <div className='absolute top-[320px] left-[200px]'>
          <button class='bg-blue-500 hover:bg-blue-400 text-white font-semibold text-2xl py-2 px-4 border border-gray-400 rounded shadow h-16 w-48 motion-safe:animate-bounce'>
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
