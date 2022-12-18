import React from "react";
import Sidebar from "./Sidebar";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProfile from "./EditProfile";
import EditProduct from "./EditProduct";
import Orders from "./Orders";
import ProfileOrders from "./ProfileOrders";
import { Routes, Route, Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  const CDate = new Date(Date.now());

  return (
    <>
      <div className='mt-20 flex'>
        <Sidebar></Sidebar>
        <div>
          {/* <p className='text-2xl font-medium'>Your Products</p> */}
          <div className='ml-52'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
