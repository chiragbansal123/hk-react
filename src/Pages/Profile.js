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
      {console.log(totalSales?.data.length)}
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

      <div className="dashboard">
        <div className="row">
          <div
            id="todaySales"
            className="dashboard-item"
            onClick={handleTodaySales}
          >
            <h4>TODAY SALES</h4>
            <div>{todaySales?.data}</div>
          </div>
          <div className="dashboard-item" onClick={handleThisMonthSales}>
            <h4>THIS MONTH SALES</h4>
            <div>{thisMonthSales?.data}</div>
          </div>
          <div className="dashboard-item" onClick={handleTotalOrders}>
            <h4>TOTAL ORDERS</h4>
            <div>{totalSales?.data.length}</div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-item">
            <h4>PROFIT</h4>
            <div>
              {console.log(
                thisMonthSales?.data.charAt(thisMonthSales?.data.length - 1)
              )}
              {thisMonthSales?.data != 0 &&
                (
                  parseFloat(
                    thisMonthSales?.data.substring(
                      0,
                      thisMonthSales?.data.length - 1
                    )
                  ) / 10
                ).toFixed(2)}
              {thisMonthSales?.data != 0 ? (
                thisMonthSales?.data.charAt(thisMonthSales?.data.length - 1) ==
                "k" ? (
                  <>k</>
                ) : (
                  <>L</>
                )
              ) : (
                <>0</>
              )}
            </div>
          </div>
          <div
            id="lowStock"
            className="dashboard-item"
            onClick={handleLowStock}
          >
            <h4>LOW STOCK</h4>
            <div>{lowStock}</div>
          </div>
          <div
            id="outOfStock"
            className="dashboard-item"
            onClick={handleOutOfStock}
          >
            <h4>OUT OF STOCK</h4>
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
