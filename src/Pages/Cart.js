import React, { useState } from "react";
import QuantityModificationBar from "../components/QuantityModificationBar";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice";
import { updateCart } from "../Reducer/stockSlice";
import { click } from "@testing-library/user-event/dist/click";
import ConfirmationBox from "../components/Confirmation-Box";
import { Link, Navigate, ScrollRestoration } from "react-router-dom";

function Cart() {
  const state = useSelector((state) => state);
  const cart = state.cart;
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [units, setUnits] = useState(0);
  const [clickedItemId, setClickedItemId] = useState(0);
  const [isGenerateBillClicked, setIsGenerateBillClicked] = useState(false);

  // var flag = false;

  // console.log(typeof cart[0].cartUnit);

  // const total = cart.map((data) =>
  //   ((data.price / data.quantity) * data.cartUnit).toFixed(1)
  // );

  // console.log(units);
  var cartTotal = 0;
  for (var i = 0; i < cart.length; i++) {
    var currCartItem = cart[i];
    // console.log(typeof currCartItem.price);
    cartTotal += parseInt(
      (currCartItem.price * currCartItem.cartUnit).toFixed(1)
    );
  }

  function handleUpdateCartUnits(id, unitsInCart) {
    setConfirmationBox(true);

    // const currItemDataOfCart = cart.filter((data) => data.id === clickedItemId);

    setUnits(unitsInCart);
    console.log(id);
    setClickedItemId(id);
    console.log(unitsInCart);
  }

  function handleBill() {
    setIsGenerateBillClicked(!isGenerateBillClicked);
    // <Invoice props={state} cartTotal={cartTotal} />;
  }

  return (
    <div className="cart">
      {cart.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>YOUR CART IS EMPTY
          </h1>
          <Link to="/home-page">
            <button className="submit-button">ADD ITEM</button>
          </Link>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="item-name">Item Name</th>
              {/* <th className="salt-field">Salt</th> */}
              <th>Price</th>
              <th>Stock</th>
              <th>Units</th>
              <th>Total</th>
              {/* <th>Update Qty</th> */}
            </tr>
          </thead>

          <tbody>
            {cart.length == 0 && <div></div>}
            {cart.length > 0 &&
            typeof cart != "undefined" &&
            cart[0].id != 0 ? (
              cart.map((data) => (
                <tr>
                  <td className="item-name">{data.name}</td>
                  <td>{data.price}/-</td>
                  <td>{data.quantity}</td>
                  <td>
                    <div
                      id="unitsUpdate"
                      onClick={() =>
                        handleUpdateCartUnits(data.id, data.cartUnit)
                      }
                    >
                      {data.cartUnit}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/32/32195.png"
                        id="quantity"
                      />
                    </div>
                  </td>
                  <td>{(data.price * data.cartUnit).toFixed(1)}</td>
                </tr>
              ))
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      )}
      {confirmationBox && (
        <ConfirmationBox
          units={units}
          setUnits={setUnits}
          setConfirmationBox={setConfirmationBox}
          clickedItemId={clickedItemId}
          setClickedItemId={setClickedItemId}
        />
      )}

      {isGenerateBillClicked && (
        <ConfirmationBox
          setIsGenerateBillClicked={setIsGenerateBillClicked}
          isGenerateBillClicked={isGenerateBillClicked}
          cartTotal={cartTotal}
        />
      )}

      {cart.length > 0 && (
        <div className="bill-section">
          <div className="cart-total">
            <div>
              Cart Total : Rs.<span>{cartTotal}</span>
            </div>
          </div>
          <div>
            <button onClick={handleBill}>Generate Bill</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
