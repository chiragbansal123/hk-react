// import { Button } from "bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import QuantityModificationBar from "./QuantityModificationBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCart,
  deleteFromCart,
  addCustomer,
} from "../Reducer/stockSlice";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";

function ConfirmationBox({
  units,
  setUnits,
  setConfirmationBox,
  clickedItemId,
  setClickedItemId,
  isGenerateBillClicked,
  setIsGenerateBillClicked,
  stockMgt,
  setStockMgt,
  cartTotal,
}) {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isdeleteFromCartClicked, setIsDeleteFromCartClicked] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const stock = useSelector((state) => state.stock);

  const currItemData = stock.filter((data) => data._id === clickedItemId);

  // console.log(currItemData);
  // console.log(clickedItemId);
  function handleConfirm() {
    const cart = {
      id: currItemData[0]._id,
      name: currItemData[0].name,
      salt: currItemData[0].salt,
      quantity: currItemData[0].quantity,
      cartUnit: units,
      price: currItemData[0].price,
      shelf: currItemData[0].shelf,
      customer: currItemData[0].customer,
    };

    dispatch(
      addToCart({
        currCart: cart,
      })
    );
    setUnits(1);
    setConfirmationBox(false);
  }

  function handleUpdateInCart() {
    // console.log(currItemData);
    const cart = {
      id: currItemData[0]._id,
      name: currItemData[0].name,
      salt: currItemData[0].salt,
      quantity: currItemData[0].quantity,
      cartUnit: units,
      price: currItemData[0].price,
      shelf: currItemData[0].shelf,
      customer: currItemData[0].customer,
    };

    dispatch(
      updateCart({
        updatedCart: cart,
      })
    );
    setUnits(0);
    setConfirmationBox(false);
  }

  function handleDeleteFromCart() {
    dispatch(
      deleteFromCart({
        id: clickedItemId,
      })
    );
    setClickedItemId(0);
    setIsDeleteFromCartClicked("clicked");
    setConfirmationBox(false);
    // navigate("/cart");
  }

  function handleUpdateInStock() {
    navigate(`/add-item/${currItemData[0]._id}`);
  }

  async function handleOutOfStock() {
    // e.preventDefault();
    // console.log(currItemData[0]._id);
    const { data } = await axios.post(`http://localhost:8000/outOfStock/`, {
      id: currItemData[0]._id,
      customer: currItemData[0].customer,
      name: currItemData[0].name,
      salt: currItemData[0].salt,
      price: currItemData[0].price,
      quantity: 0,
      shelf: currItemData[0].shelf,
      availability: false,
      worksAt: state.user.worksAt,
    });

    // const cart = {
    //   availability: false,
    //   id: currItemData[0]._id,
    //   name: currItemData[0].name,
    //   salt: currItemData[0].salt,
    //   quantity: 0,
    //   cartUnit: 0,
    //   price: currItemData[0].price,
    //   shelf: currItemData[0].shelf,
    //   customer: currItemData[0].customer,
    // };

    // dispatch(
    //   updateCart({
    //     updatedCart: cart,
    //   })
    // );

    // alert("Item Updated");
    setConfirmationBox(false);
    // navigate("/home-page");
  }

  function cross() {
    if (path == "/cart" && !isGenerateBillClicked) {
      setUnits(0);
    } else if (path == "/home-page") {
      setUnits(1);
    }

    if (isGenerateBillClicked) {
      setIsGenerateBillClicked(!isGenerateBillClicked);
    } else {
      setConfirmationBox(false);
    }

    // console.log(typeof stockMgt);
    if (stockMgt != undefined) {
      setStockMgt(false);
    }
  }

  // console.log(clickedItemId);

  async function handleProceedToInvoice(e) {
    e.preventDefault();
    setIsGenerateBillClicked(false);

    const customer_name = document.getElementById("customerName").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const endCustomer = {
      name: customer_name,
      mobile: mobile,
      email: email,
      billAmount: cartTotal,
      shoppedFrom: state.user.worksAt,
    };

    dispatch(
      addCustomer({
        endCustomer: endCustomer,
      })
    );

    state.cart.map((cartItem) =>
      axios.post(`http://localhost:8000/updateStockAfterBill`, {
        id: cartItem.id,
        cartUnit: cartItem.cartUnit,
      })
    );

    // const { newInvoiceNo } = await axios.get(
    //   `http://localhost:8000/getInvoiceNo/${state.user.worksAt}`
    // );

    // console.log(newInvoiceNo);

    const { data } = await axios.post(`http://localhost:8000/createInvoice`, {
      // invoiceNo: 100,
      cart: state.cart,
      name: customer_name,
      mobile: mobile,
      billAmount: cartTotal,
      invoiceDate: Date().substring(0, 25),
      // shoppedFrom: state.user.worksAt,
      businessName: state.user.worksAt,
    });

    console.log(data);

    console.log(data);
    if (data != undefined) {
      navigate(`/invoice/${data?.invoiceNo}`);
    }

    navigate(`/invoice/${data?.invoiceNo}`);

    state.cart.map((cartItem) =>
      dispatch(
        deleteFromCart({
          id: cartItem.id,
        })
      )
    );

    // console.log(state.user.worksAt);

    // alert("Item Updated");
    // navigate("/home-page");
    // console.log(itemData);

    //
  }

  return (
    <div className="confirmation-box">
      {!stockMgt ? (
        <div className="content-box">
          {!setIsGenerateBillClicked && <div>Select Units</div>}
          <div className="back-to-home-cross-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
              className="back-to-home-cross"
              onClick={cross}
            />
          </div>
          {!setIsGenerateBillClicked && (
            <QuantityModificationBar
              clickedItemId={clickedItemId}
              units={units}
              setUnits={setUnits}
              setIsDeleteFromCartClicked={setIsDeleteFromCartClicked}
            />
          )}
          {path == "/home-page" && (
            <button onClick={handleConfirm}>CONFIRM</button>
          )}
          {path == "/cart" &&
            !isdeleteFromCartClicked &&
            !setIsGenerateBillClicked && (
              <button onClick={handleUpdateInCart}>UPDATE</button>
            )}
          {path == "/cart" && isdeleteFromCartClicked && (
            <button onClick={handleDeleteFromCart}>DELETE</button>
          )}
          {path == "/cart" && setIsGenerateBillClicked && (
            <form onSubmit={handleProceedToInvoice}>
              <input
                type="text"
                placeholder="Customer Name"
                id="customerName"
                // value={itemData.salt}
                required
              ></input>
              <input
                type="text"
                placeholder="Mobile No."
                id="mobile"
                // value={itemData.salt}
                required
              ></input>
              <input
                type="email"
                placeholder="Email"
                id="email"
                // value={itemData.salt}
              ></input>
              <button className="proceed">PROCEED</button>
            </form>
          )}
        </div>
      ) : (
        <div className="stock-content-box">
          Manage Stock
          <div className="back-to-home-cross-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
              className="back-to-home-cross"
              onClick={cross}
            />
          </div>
          <button onClick={handleUpdateInStock}>
            Update {currItemData[0].name}
          </button>
          {/* <button onClick={handleOutOfStock}>Mark Out of Stock</button> */}
          {/* <button onClick={handleDelete}>DELETE</button> */}
        </div>
      )}
    </div>
  );
}

export default ConfirmationBox;
