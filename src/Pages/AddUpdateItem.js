import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import { addItem } from "../Reducer/stockSlice";

function AddUpdateItem() {
  const state = useSelector((state) => state);
  const stock = useSelector((state) => state.stock);
  const { id } = useParams();
  var currentItem;
  if (id) {
    currentItem = stock.filter((item) => item._id == id);
  }
  const [itemData, setItemData] = useState({
    name: currentItem ? currentItem[0]?.name : "",
    salt: currentItem ? currentItem[0]?.salt : "",
    quantity: currentItem ? currentItem[0]?.quantity : "",
    price: currentItem ? currentItem[0]?.price : "",
    shelf: currentItem ? currentItem[0]?.shelf : "",
  });
  console.log(itemData);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(currentItem[0]);

  function clear() {
    setItemData({ name: "", salt: "", quantity: "", price: "", shelf: "" });
  }

  function handleGotoStock() {
    navigate("/home-page");
  }

  async function handleAddItem(e) {
    e.preventDefault();
    var name = document.getElementById("itemName").value;
    var salt = document.getElementById("salt").value;
    var price = document.getElementById("price").value;
    var stock = document.getElementById("stock").value;
    var shelf = document.getElementById("shelfNo").value;

    const { data } = await axios.post("http://localhost:8000/createStock", {
      customer: state.user.id,
      name: name,
      salt: salt,
      price: price,
      quantity: stock,
      shelf: shelf,
      worksAt: state.user.worksAt,
      availability: true,
    });

    alert("Item added in stock");
    clear();
    // console.log(state.user.worksAt);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:8000/updateStock/${id}`,
      {
        customer: state.user.id,
        name: itemData.name,
        salt: itemData.salt,
        price: itemData.price,
        quantity: itemData.quantity,
        shelf: itemData.shelf,
        worksAt: state.user.worksAt,
        availability: true,
      }
    );
    alert("Item Updated");
    navigate("/home-page");
    console.log(itemData);
  }

  //  ??????

  useEffect(() => {
    console.log(itemData);
  }, [itemData]);
  return (
    <div className="add-update-item">
      {id ? (
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>UPDATE ITEM</h1>
          </div>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Item Name"
              id="itemName"
              value={itemData.name}
              required
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Salt"
              id="salt"
              value={itemData.salt}
              required
              onChange={(e) =>
                setItemData({ ...itemData, salt: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Price"
              id="price"
              value={itemData.price}
              required
              onChange={(e) =>
                setItemData({ ...itemData, price: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Stock"
              id="stock"
              value={itemData.quantity}
              required
              onChange={(e) =>
                setItemData({ ...itemData, quantity: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Shelf No."
              id="shelfNo"
              value={itemData.shelf}
              required
              onChange={(e) =>
                setItemData({ ...itemData, shelf: e.target.value })
              }
            ></input>
            <button type="submit" className="submit-button">
              UPDATE ITEM
            </button>
            {state.stock.length > 0 && (
              <button className="submit-button" onClick={handleGotoStock}>
                GO TO STOCK
              </button>
            )}
          </form>
        </div>
      ) : (
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>ADD NEW ITEM</h1>
          </div>
          <form onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="Item Name"
              value={itemData.name}
              id="itemName"
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Salt"
              value={itemData.salt}
              id="salt"
              onChange={(e) =>
                setItemData({ ...itemData, salt: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Price"
              value={itemData.price}
              id="price"
              onChange={(e) =>
                setItemData({ ...itemData, price: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Stock"
              value={itemData.quantity}
              id="stock"
              onChange={(e) =>
                setItemData({ ...itemData, quantity: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Shelf No."
              value={itemData.shelf}
              id="shelfNo"
              onChange={(e) =>
                setItemData({ ...itemData, shelf: e.target.value })
              }
              required
            ></input>
            <button type="submit" className="submit-button">
              ADD ITEM TO STOCK
            </button>
            {state.stock.length > 0 && (
              <button className="submit-button" onClick={handleGotoStock}>
                GO TO STOCK
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default AddUpdateItem;
