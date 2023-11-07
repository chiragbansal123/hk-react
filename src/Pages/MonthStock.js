import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MonthStock() {
  const [monthlyStock, setmonthlyStock] = useState();
  const state = useSelector((state) => state);
    const navigate=useNavigate();
  async function func() {
    // console.log(state);
    const {data}=await axios.get(`https://hk-backend-zeta.vercel.app/getThisMonthInvoice/${state.user.worksAt}`);
    setmonthlyStock(data);
    
  }
  useEffect(() => {
    func();
  }, []);
  function handleInvoice(id){
    navigate(`/invoice/${id}`)
  }
  return (
    <div className="low-stock">
        {/* {console.log(monthlyStock)} */}
      {monthlyStock?.length == 0 ? (
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
                <th className="item-name">Invoice No.</th>
                <th>Cx Name</th>
                <th>Mobile</th>
                <th>Date</th>
              </tr>
        </thead>
        <tbody>
          {monthlyStock?.map((data) => (
            <tr>
              <td className="item-name" onClick={()=>handleInvoice(data.invoiceNo)}>{data.invoiceNo}</td>
              <td>{data.name}</td>
              <td>{data.mobile}</td>
              <td>{data.invoiceDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthStock;
