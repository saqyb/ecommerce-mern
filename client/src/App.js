import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
// import Loader from "./components/loader/Loader";
import Error from "./components/error/Error";
import Homepage from "./components/homepage/Homepage";
import SearchPage from "./components/homepage/SearchPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Product from "./components/homepage/Product";
import Cart from "./components/navbar/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Logout from "./components/Logout/Logout";
import AddProduct from "./components/Dashboard/AddProduct";
import Products from "./components/Dashboard/Products";
import Orders from "./components/Dashboard/Orders";
import EditProduct from "./components/Dashboard/EditProduct";
import EditProfile from "./components/Dashboard/EditProfile";
import CategoryPage from "./components/homepage/CategoryPage";
import ProfileOrders from "./components/Dashboard/ProfileOrders";
import StorePage from "./components/homepage/StorePage";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Homepage />}></Route>
        <Route exact path='*' element={<Error />}></Route>
        <Route exact path='/cart' element={<Cart />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Signup />}></Route>
        {/* <Route exact path='/products' element={<Products />}></Route> */}
        <Route exact path='/logout' element={<Logout />}></Route>
        <Route exact path='/product' element={<Product />}></Route>
        <Route exact path='dashboard' element={<Dashboard />}>
          <Route path='products' element={<Products />}></Route>
          <Route exact path='/dashboard/add' element={<AddProduct />}></Route>
          <Route
            exact
            path='/dashboard/editProfile'
            element={<EditProfile />}
          />
          <Route exact path='/dashboard/orders' element={<Orders />}></Route>
          <Route
            exact
            path='/dashboard/ProfileOrders'
            element={<ProfileOrders />}
          ></Route>
          <Route
            exact
            path='/dashboard/updateProduct'
            element={<EditProduct />}
          ></Route>
        </Route>
        <Route exact path='/search' element={<SearchPage />}></Route>
        <Route exact path='/store/:userId' element={<StorePage />}></Route>

        <Route
          exact
          path='/category/:itemId'
          element={<CategoryPage />}
        ></Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AppRoutes />
      <Footer></Footer>
    </div>
  );
};

export default App;
