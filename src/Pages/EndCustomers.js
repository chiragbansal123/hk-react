import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EndCustomers() {
  const [endCustomers, setEndCustomers] = useState();
  const state = useSelector((state) => state);

  const navigate = useNavigate();

  async function getEndCustomers() {
    setEndCustomers(
      await axios.get(
        `http://localhost:8000/getEndCustomers/${state.user.worksAt}`
      )
    );
    // console.log(endCustomers);
  }

  useEffect(() => {
    console.log("useEffect hu main");
    getEndCustomers();
  }, []);

  function handleCx(mob) {
    // alert("Under Development");
    navigate(`/endCx/${mob}`);
  }

  return (
    <div className="end-customers">
      {endCustomers?.data.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>NO ORDERS FOUND
          </h1>
        </div>
      ) : (
        <div className="Search-Bar"></div>
      )}
      <table>
        <thead>
          <tr>
            <th className="item-name">Customer Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {endCustomers?.data.map((data) => (
            // console.log(data)
            <tr>
              <td className="item-name" onClick={() => handleCx(data.mobile)}>
                {data.name}
              </td>
              <td>{data.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EndCustomers;
