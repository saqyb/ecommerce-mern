import React from "react";
import { Tabs } from "antd";
import EditProfle from "./EditProfile";
import Products from "./Products";
import AddProduct from "./AddProduct";
import OrdersTest from "./OrdersTest";
const Dashboard = () => {
  return (
    <>
      <div className='mt-20'>
        <Tabs defaultActiveKey='tab2' tabPosition={"left"}>
          <Tabs.TabPane tab='Add New Products' key='tab1'>
            <AddProduct></AddProduct>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Your Products' key='tab2'>
            <Products></Products>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Edit Profile' key='tab3'>
            <EditProfle></EditProfle>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Your Orders' key='tab4'>
            <OrdersTest></OrdersTest>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default Dashboard;
