import React from "react";
import Sidebar from "./Sidebar";

import { Routes, Route, Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  const CDate = new Date(Date.now());

  return (
    <>
      <div className=' bg-gray-100 flex h-full'>
        <div className=' bg-white py-20 shadow-xl w-1/6'>
          <Sidebar></Sidebar>
        </div>
        <div className='mt-20 h-full bg-gray-100 w-5/6'>
          {/* <p className='text-2xl font-medium'>Your Products</p> */}
          <div className='w-5/6 my-auto mx-auto'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
