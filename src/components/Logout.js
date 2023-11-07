import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Reducer/stockSlice";
import axios, { AxiosHeaders } from "axios";

function Logout({ isUserClicked, setIsUserClicked }) {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  function handleProfile() {
    setIsUserClicked(!isUserClicked);
    // navigate("/profile");
  }

  async function handleUserLogout() {
    console.log(email);
    try {
      const { data } = await axios.post(https://hk-backend-zeta.vercel.app/logout", {
        email: email,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    dispatch(logout());
  }
  return (
    <div className="logout">
      <Link to="profile">
        <div
          style={{ color: "black", marginTop: "10px", marginLeft: "28%" }}
          onClick={handleProfile}
        >
          PROFILE
        </div>
      </Link>
      <Link to="/">
        <div className="logout-button" onClick={handleUserLogout}>
          LOG OUT
        </div>
      </Link>
    </div>
  );
}

export default Logout;
