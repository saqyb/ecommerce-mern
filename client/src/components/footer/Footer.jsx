import React from "react";

const Footer = () => {
  return (
    <>
      <footer className='shadow bottom-0 left-0 z-10 p-2 flex justify-center items-center w-full fixed'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          Coded by{" "}
          <a target={"blank"} href='https://github.com/saqyb'>
            Saqib
          </a>
          {/* &#10085; &#10084; &hearts; ❤️️ */}
        </span>
      </footer>
    </>
  );
};

export default Footer;
