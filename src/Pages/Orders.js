import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import Invoice from "./Invoice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Orders() {
  const [invoices, setInvoices] = useState(null);
  // const [todayInvoices, setTodayInvoices] = useState();
  const state = useSelector((state) => state);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  async function getInvoices() {
    // console.log("gere");
    setInvoices(
      await axios.get(
        `http://localhost:8000/getAllInvoice/${state.user.worksAt}`
      )
    );
    // console.log(invoices);
  }

  async function getInvoices(id) {
    setInvoices(
      await axios.get(
        `http://localhost:8000/getTodaysAllInvoice?businessName=${state.user.worksAt}&date=${id}`
      )
    );
  }

  useEffect(() => {
    // console.log(id);
    if (id) {
      getInvoices(id);
    } else {
      getInvoices();
    }
  }, []);

  useEffect(() => {
    // Filter data based on the search input value
    // invoices = {};
    const filtered = invoices?.data.filter(
      (item) =>
        item.mobile.toString().startsWith(searchValue.toString()) ||
        item.invoiceNo.toString().startsWith(searchValue.toString()) ||
        item.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setFilteredData(filtered);

    // console.log(filteredData);

    // console.log("=> filtered data", filteredData);
  }, [searchValue, invoices]);

  function handleInvoice(invoiceNo) {
    navigate(`/invoice/${invoiceNo}`);
  }

  return (
    <div className="orders">
      {invoices?.data.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>NO ORDERS FOUND
          </h1>
          <Link to="/home-page">
            <button className="submit-button">PLACE AN ORDER</button>
          </Link>
        </div>
      ) : (
        <div className="orders">
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
          <table>
            <thead>
              <tr>
                <th className="item-name">Invoice No.</th>
                <th>Cx Name</th>
                <th>Mobile</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((data) => (
                <tr onClick={() => handleInvoice(data.invoiceNo)}>
                  <td className="item-name">{data.invoiceNo}</td>
                  <td>{data.name}</td>
                  <td>{data.mobile}</td>
                  <td>{data.invoiceDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* {console.log(invoices)} */}
    </div>
  );
}

export default Orders;
