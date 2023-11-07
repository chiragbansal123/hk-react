import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { update } from "../Reducer/stockSlice";

function QuantityModificationBar({
  clickedItemId,
  units,
  setUnits,
  isDeleteFromCartClicked,
  setIsDeleteFromCartClicked,
}) {
  // console.log(units);
  // const [qty, setqty] = useState(units);
  const stock = useSelector((state) => state.stock);
  let cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  // console.log("---> ", clickedItemId);

  var inStock;

  if (clickedItemId) {
    // console.log(clickedItemId);
    if (path == "/home-page") {
      const currItemData = stock.filter((data) => data._id === clickedItemId);
      inStock = currItemData[0].quantity;

      // console.log(inStock);
      // console.log("-> ", clickedItemId);
    } else if (path == "/cart" && isDeleteFromCartClicked != "clicked") {
      const currItemDataOfCart = cart.filter(
        (data) => data.id === clickedItemId
      );
      inStock = currItemDataOfCart[0].quantity;
    }
  }

  // console.log(location.pathname);

  function handleDecrement() {
    if (units > 1) {
      setUnits(units - 1);
    }
  }

  function handleDropDown(e) {
    if (e.target.value <= inStock) {
      setUnits(parseInt(e.target.value));
    } else {
      alert("Not enough units in stock");
    }
  }

  function handleIncrement() {
    if (units < inStock) {
      setUnits(units + 1);
      console.log(units);
    } else {
      console.log(inStock);
      alert("Not enough units in stock");
    }
  }

  function handleDeleteFromCart() {
    setIsDeleteFromCartClicked(true);
    setUnits(0);
  }

  return (
    <div className="quantity-modification-bar">
      <img
        className="decreament"
        onClick={handleDecrement}
        src="https://cdn-icons-png.flaticon.com/128/992/992683.png"
      />

      {path === "/cart" ? (
        <span className="drop-down">
          <span className="units">{units}</span>
        </span>
      ) : (
        <span className="drop-down">
          <span className="units">{units}</span>
          <select name="quantity" id="quantity" onChange={handleDropDown}>
            <option value="5" defaultValue>
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>
        </span>
      )}

      <img
        className="increment"
        onClick={() => handleIncrement()}
        src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
      />

      {path === "/cart" && (
        <div className="delete-from-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3976/3976956.png"
            onClick={handleDeleteFromCart}
          />
        </div>
      )}
    </div>
  );
}

export default QuantityModificationBar;
