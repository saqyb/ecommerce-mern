import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div class=''>
        <ul class='w-52 fixed text-gray-700 pt-1'>
          <NavLink to={"/dashboard/add"}>
            <li className='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'>
              Add New Product
            </li>
          </NavLink>
          <NavLink to={"/dashboard/products"}>
            <li className='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'>
              Your Products
            </li>
          </NavLink>

          <NavLink to={"editProfile"}>
            <li className='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'>
              Edit Profile
            </li>
          </NavLink>
          <NavLink to={"/dashboard/orders"}>
            <li className='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'>
              Pending Orders
            </li>
          </NavLink>
          <NavLink to={"/dashboard/ProfileOrders"}>
            <li className='bg-gray-100 hover:bg-gray-200 py-2 px-4 block text-left w-full'>
              View Your Orders
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
