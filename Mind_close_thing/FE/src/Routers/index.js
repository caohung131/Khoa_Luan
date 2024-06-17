import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login_Register/Login";
import Register from "../pages/Login_Register/Register";
import Profile from "../pages/Profile";
import Cart from "../pages/Home/Cart";
import Shop from "../pages/Home/Shop";
import Admin from "../pages/Home/Admin";
import Detail from "../pages/Home/Detail";
import OrderUser from "../pages/Home/OrderUser";
import ReturnPolicy from "../pages/Home/DoiTra";
import StoreLocation from "../pages/Home/StoreLocation";
import Contact from "../pages/Home/Contact";
import Bangsize from "../pages/Home/BangSize";
import ImageUpload from "../pages/Home/UploadFile2";

const Routers = () => {

  const [isAuth, setIsAuth] = useState();

    const isAuthenticated =
    !!localStorage.getItem("user") || !!localStorage.getItem("user/admin");
    // console.log(isAuthenticated);


    // setIsAuth(isAuthenticated);

    // console.log(isAuth);

  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={ // Nếu đã đăng nhập và có user/admin trong localstorage = admin 
            isAuthenticated &&
            JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated &&
            JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/" element={<Home />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/order-user" element={<OrderUser />} />
        <Route path="/doitra" element={< ReturnPolicy />} />
        <Route path="/vitri" element={< StoreLocation />} />
        <Route path="/lienhe" element={< Contact />} />
        <Route path="/bangsize" element={< Bangsize />} />
        <Route path="/upload" element={< ImageUpload />} />
        {/* <Route path="/admin" element={<Admin />} />  */}
      </Routes>
    </>
  );
};

export default Routers;
