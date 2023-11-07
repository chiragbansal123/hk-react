import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DatePicker from 'react-date-picker';



function Profile() {
  const [isUserIconClicked, setIsUserIconClicked] = useState(true);
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [thisMonthSales, setThisMonthSales] = useState();
  const [todaySales, setTodaySales] = useState();
  // const [customers, setCustomers] = useState();
  const [profit, setProfit] = useState();
  const [lowStock, setLowStock] = useState();
  const [outOfStock, setOutOfStock] = useState();
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [close,setClose]=useState(false)
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setClose(true);
  // };


  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);
  // console.log(user);
  function handleUserIconClick() {
    setIsUserIconClicked(!isUserIconClicked);
    console.log("userClicked");
  }

  function handleTodaySales() {
    navigate(`/orders/${Date()}`);
  }

  // function handleCustomers() {
  //   navigate("/endCustomers");
  // }
  function handleMonthSales(){
    navigate("/monthlyStock");
  }
  function handleStock() {
    navigate("/home-page");
  }

  function handleLowStock() {
    navigate(`/lowStock`);
  }
  function outofstock(){
    navigate('/outOfStock');
  }
  async function handleDateSubmit(){
    const startDate=document.getElementById('startdate').value;
    const endDate=document.getElementById('enddate').value;
    const data=await axios.get(`https://hk-backend-zeta.vercel.app/filterByDate?startDate=${startDate}&endDate=${endDate}`);
    // console.log(startDate.toString(),endDate.toString());
    
  }
  
  async function func() {
    console.log(state.user.worksAt);
    const lowStock = state.stock.filter(
      (item) => item.quantity <= 5 && item.quantity > 0
    );
    setLowStock(lowStock.length);
    const outOfStock = state.stock.filter((item) => item.availability == false);
    setOutOfStock(outOfStock.length);

    setTodaySales(
      await axios.get(
        `https://hk-backend-zeta.vercel.app/getTodaySales/${state.user.worksAt}`
      )
    );
    setThisMonthSales(
      await axios.get(
        `https://hk-backend-zeta.vercel.app/getThisMonthSales/${state.user.worksAt}`
      )
    );

    setProfit(
      await axios.get(
        `https://hk-backend-zeta.vercel.app/getCustomers/${state.user.worksAt}`
      )
    );
  }

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="profile">
      {/* {console.log(todaySales?.data)} */}
      {/* <h1>PROFILE PAGE</h1> */}

      {/* <div id="headerUserIcon">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          onClick={handleUserIconClick}
        />
      </div>
      {isUserIconClicked && (
        <form>
          <div>{isUserIconClicked ? <>{user.email}</> : <>CLicked</>}</div>
        </form>
      )} */}
        {/* <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy" // Customize the date format
        disableCalendar={close}
      />
      {selectedDate && (
        <p>Selected Date: {selectedDate.toDateString()}</p>
      )} */}
      <span>
      <input type="date" id="startdate"/>
      <input type="date" id="enddate"/>
      <input type="submit" value="search" onClick={handleDateSubmit}></input>
      </span>
      <div className="dashboard">
        <div className="row">
          <div
            id="todaySales"
            className="dashboard-item"
            onClick={handleTodaySales}
          >
            <h3>TODAY SALES</h3>
            <div>{todaySales?.data}</div>
          </div>
          <div className="dashboard-item" onClick={handleMonthSales}>
            <h3>THIS MONTH SALES</h3>
            <div>{thisMonthSales?.data}</div>
          </div>
          <div
            className="dashboard-item"
            // onClick={handleCustomers}
          >
            <h3>PROFIT</h3>
            <div>
              {thisMonthSales?.data==0 ? 0 :parseFloat(
                thisMonthSales?.data.substring(
                  0,
                  thisMonthSales?.data.length - 1
                )
              ) / 10}
              {thisMonthSales?.data!=0 && thisMonthSales?.data.charAt(thisMonthSales?.data.length) ==
              "k" ? (
                <>k</>
              ) : (
                <>L</>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-item" onClick={handleStock}>
            <h3>STOCK</h3>
            <div>{state.stock.length}</div>
          </div>
          <div
            id="lowStock"
            className="dashboard-item"
            onClick={handleLowStock}
          >
            <h3>LOW STOCK</h3>
            <div>{lowStock}</div>
          </div>
          <div id="outOfStock" className="dashboard-item" onClick={outofstock}>
            <h3>OUT OF STOCK</h3>
            <div>{outOfStock}</div>
          </div>
        </div>
      </div>
      

      {/* <div className="profile-bottom">
        <div id="orders">ORDERS</div>
        <div id="customers" onClick={handleCustomers}>
          CUSTOMERS
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
