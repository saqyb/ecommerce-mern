import React from "react";
import { NavLink } from "react-router-dom";

const NoDataUI = () => {
  return (
    <>
      {/* <!-- component --> */}
      {/* <!-- This is an example component --> */}
      <div class=' flex items-center'>
        <div class='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
          <div class='max-w-md'>
            <div class='text-5xl font-dark font-bold'>Sorry!</div>
            <p class='mt-5 text-2xl md:text-3xl font-light leading-normal'>
              We couldn't find Any Data
            </p>
            <p class='mb-8'>
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <NavLink to={"/"}>
              <button class='px-4 inline py-2 text-base font-normal leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'>
                Back to Homepage
              </button>
            </NavLink>
          </div>
          <div class='max-w-lg'>
            <img src='../media/NoDataUI.png' alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoDataUI;
