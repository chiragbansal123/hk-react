import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import AddUpdateItem from "../Pages/AddUpdateItem";
// import "/";

function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // need to initialize false
  const [isUserClicked, setIsUserClicked] = useState(false);
  const isAuth = useSelector((state) => state.isAuth);

  function handleUserIconClick() {
    setIsUserClicked(!isUserClicked);
    // console.log("user clicked -> ", isUserClicked);
    // console.log("isAuth-> ", isAuth);
  }

  // console.log("user clicked ", isUserClicked);
  // console.log("isAuth ", isAuth);

  return (
    <div className="header">
      {isAuth ? (
        <Link to="/home-page">Hisaab Kitaab</Link>
      ) : (
        <Link to="/">Hisaab Kitaab</Link>
      )}
      {/* <div id="headerLogo"></div> */}
      <div className="header-user-cart">
        {isAuth && (
          <span id="headerUserIcon">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              onClick={handleUserIconClick}
            />
          </span>
        )}
        {isAuth && (
          <span id="cartIcon">
            <Link to="/cart">
              <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" />
            </Link>
          </span>
        )}
      </div>
      {/* {!isAuth && !isUserClicked ? <div></div> : <Logout />} */}
      {isAuth && isUserClicked && (
        <Logout
          isUserClicked={isUserClicked}
          setIsUserClicked={setIsUserClicked}
        />
      )}
    </div>
  );
}

export default Header;
