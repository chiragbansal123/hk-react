import React, { useEffect, useState } from "react";

import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
// import ConfirmationBox from "../components/Confirmation-Box";

function GenerateInvoice() {
  const elementToCapture = document.getElementById("invoiceCapture");
  const desiredWidth = elementToCapture.offsetWidth;
  const desiredHeight = elementToCapture.offsetHeight;

  html2canvas(elementToCapture, {
    width: desiredWidth,
    height: desiredHeight,
  }).then((canvas) => {
    console.log(canvas);
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [600, desiredHeight],
    });

    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    console.log(imgProps);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
}

function Invoice() {
  // var [invoice, setInvoice] = useState(false);
  const [bill, setBill] = useState(null);
  const state = useSelector((state) => state);
  const { id } = useParams();

  async function func() {
    setBill(await axios.get(`https://hk-backend-zeta.vercel.app/getInvoice/${id}`));
    // console.log(bill);
  }

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="invoice">
      <div id="invoiceCapture">
        {/* {console.log(bill?.data)} */}
        <div className="main-invoice">
          <div id="invoiceBusinessName">
            <h4 className="invoice-part">{bill?.data.businessName}</h4>
          </div>
          <br></br>
          <div className="invoice-top">
            <h5 className="invoice-part">Invoice No. {bill?.data.invoiceNo}</h5>
          </div>

          <div className="Billing-details">
            <div>
              <h3 className="invoice-part">Billed From:</h3>
              <h4 className="invoice-part">{state.user.worksAt || ""}</h4>
              <h4 className="invoice-part">{state.user.email}</h4>
              <h4 className="invoice-part">GSTIN -</h4>
            </div>
            <div>
              <h3 className="invoice-part">Billed to:</h3>
              <h4 className="invoice-part">{bill?.data.name}</h4>
              <h4 className="invoice-part">{bill?.data.mobile}</h4>
              <h4 className="invoice-part">{bill?.data.email}</h4>
            </div>
            <div id="billingDate">
              <h3 className="invoice-part">Billing Date:</h3>
              <h4 className="invoice-part">{bill?.data.createdAt}</h4>
            </div>
          </div>

          <div className="table-content">
            <table>
              <thead>
                <tr id="tableHeader">
                  <th className="item-name">ITEM</th>
                  <th>PRICE</th>

                  <th>QTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>

              {bill?.data.cart.map((item, i) => {
                return (
                  <tr>
                    <td className="item-name">{item.name}</td>
                    <td>₹{item.price}</td>

                    <td>{item.cartUnit}</td>
                    <td>₹{item.price * item.cartUnit}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="invoice-part-bottom">
            <span id="gst-section">
              <div>
                <h6>CGST - 9.00%</h6>
              </div>
              <div>
                <h6>SGST - 9.00%</h6>
              </div>
              <div>
                <h6>₹{(bill?.data.billAmount / 100) * 18}</h6>
              </div>
            </span>
            <h5 id="total">Amount&nbsp;Paid ₹{bill?.data.billAmount}</h5>
          </div>
        </div>
      </div>

      <div className="share-invoice">
        <button onClick={GenerateInvoice}>
          <BiCloudDownload
            style={{
              width: "20px",
              height: "20px",
              marginTop: "-2px",
              marginLeft: "-30px",
              position: "absolute",
            }}
          />
          DOWNLOAD INVOICE
        </button>
      </div>
      <hr />
    </div>
  );
}
export default Invoice;
