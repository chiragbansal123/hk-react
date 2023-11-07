import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ConfirmationBox from "../components/Confirmation-Box";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProducts } from "../Reducer/stockSlice";
import { click } from "@testing-library/user-event/dist/click";
// import { store } from "../store/store";

function HomePage() {
  const client = useSelector((state) => state.user.worksAt);
  const stock = useSelector((state) => state?.stock);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [units, setUnits] = useState(1);

  const [confirmationBox, setConfirmationBox] = useState(false);
  const [clickedItemId, setClickedItemId] = useState();
  const [isIdExistsInCart, setIsIdExistsInCart] = useState(false);
  const [stockMgt, setStockMgt] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  // console.log(stock);

  var idExistsInCart;
  // function handleConfirmationBox() {
  //   setConfirmationBox(true);
  // }

  // console.log(units);

  function handleAddToCart(id) {
    // idExistsInCart = cart.find((cartData) => cartData.id === id);
    setConfirmationBox(true);
    setClickedItemId(id);
  }

  function handleGoToCart() {
    // console.log("go to cart");
    navigate("/cart");
  }

  function handleAddItem() {
    console.log("redirect");
    navigate("/add-item");
  }

  async function getData() {
    try {
      const data = await axios.get(`https://hk-backend-zeta.vercel.app/getStock/${client}`);

      dispatch(
        getProducts({
          stock: data.data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Filter data based on the search input value
    const filtered = stock.filter(
      (item) =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        item.salt.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
    // console.log("=> filtered data", filteredData);
  }, [searchValue, stock]);

  function handleItemPage() {
    alert("Item Page under development");
    // navigate("/item-details");
  }
  function handleLowStock(id) {
    setConfirmationBox(true);
    setStockMgt(true);
    setClickedItemId(id);
    // alert("Stock Mgt. under development");
  }

  // console.log(clickedItemId);

  // running 5 times, need to check useEffect (inspect via console)
  return (
    <div className="HomePage">
      {stock.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>YOU HAVE NOTHING IN STOCK
          </h1>
          <Link to="/add-item">
            <button className="submit-button">ADD ITEM</button>
          </Link>
        </div>
      ) : (
        <div className="Search-Bar">
          <input
            type="text"
            value={searchValue}
            placeholder="search for item name"
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <span>
            SEARCH
            <img />
          </span>
        </div>
      )}
      {confirmationBox && (
        <ConfirmationBox
          // confirmationBox={confirmationBox}
          // lastPage={"home-page"}
          units={units}
          setUnits={setUnits}
          setConfirmationBox={setConfirmationBox}
          clickedItemId={clickedItemId}
          stockMgt={stockMgt}
          setStockMgt={setStockMgt}
        />
      )}
      {stock.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="item-name">ITEM NAME</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>SHELF No.</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr key={data._id}>
                  {/* {console.log(data.availability)} */}
                  {data.quantity <= 5 ? (
                    <div className="low-stock-row">
                      <td
                        className="item-name"
                        onClick={() => handleLowStock(data._id)}
                      >
                        {data.name}
                      </td>
                      <td>{data.price}/-</td>
                      <td>
                        <div>
                          {data.quantity}
                          {/* <img src="https://cdn-icons-png.flaticon.com/128/9215/9215114.png" /> */}
                        </div>
                      </td>
                      <td>{data.shelf}</td>
                      {data.availability && data.quantity > 0 ? (
                        <td className="cartIcon">
                          {(idExistsInCart = cart.find(
                            (cartData) => cartData.id === data._id
                          )) && idExistsInCart != undefined ? (
                            <img
                              src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                              onClick={handleGoToCart}
                            />
                          ) : (
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                              onClick={() => handleAddToCart(data._id)}
                            />
                          )}
                        </td>
                      ) : (
                        <td className="cartIcon">
                          <img></img>
                        </td>
                      )}
                    </div>
                  ) : (
                    <div className="row">
                      <td className="item-name" onClick={handleItemPage}>
                        {data.name}
                      </td>
                      <td>{data.price}/-</td>
                      <td> {data.quantity}</td>
                      <td>{data.shelf}</td>
                      <td className="cartIcon">
                        {(idExistsInCart = cart.find(
                          (cartData) => cartData.id === data._id
                        )) && idExistsInCart != undefined ? (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                            onClick={handleGoToCart}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                            onClick={() => handleAddToCart(data._id)}
                          />
                        )}
                      </td>
                    </div>
                  )}
                  {/* {data.quantity == 0 && (
                    <div className="out-of-stock-row">
                      <td className="item-name" onClick={handleItemPage}>
                        {data.name}
                      </td>
                      <td>{data.price}/-</td>
                      <td> {data.quantity}</td>
                      <td>{data.shelf}</td>
                      <td className="cartIcon">
                        {(idExistsInCart = cart.find(
                          (cartData) => cartData.id === data._id
                        )) && idExistsInCart != undefined ? (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                            onClick={handleGoToCart}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                            onClick={() => handleAddToCart(data._id)}
                          />
                        )}
                      </td>
                    </div>
                  )} */}
                </tr>
              ))
            ) : (
              <h1>UGH...! NOTHING FOUND</h1>
            )}
          </tbody>
        </table>
      )}
      <button className="submit-button" onClick={handleAddItem}>
        ADD NEW ITEM
      </button>
    </div>
  );
}

export default HomePage;
