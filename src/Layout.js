import React from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import LoginRegisterBar from "./Login-Register-Bar";
// import LoginPage from "./Pages/LoginPage";
// import Register from "./Register";
import ConfirmationBox from "./components/Confirmation-Box";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import { useSelector } from "react-redux";
import AddUpdateItem from "./Pages/AddUpdateItem";

// import LoginPage from "./LoginPage";

function Layout() {
  var isUserClicked = false;
  return (
    <div className="App">
      <Header isUserClicked={isUserClicked} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
