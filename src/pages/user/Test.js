import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";

// import PopUp from "./PopUp";

import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Id = "1";
export default function GetUser() {
const [getDetail, setgetDetail] = useState([]);



useEffect(() => {
    GetRideDetail();
  }, []);

  function GetRideDetail() {
    axios
      .get(`https://localhost:7149/api/HostRide/getDetailRide?Id=` + Id)
      .then((Response) => {
        setgetDetail(Response.data);
        console.log("details-get", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <Layout>
    <div className="list-arrangeElement">
      

      {getDetail.map((data) => {
        return (
          <div key={data.memberId} className="RowArrange">
           
           
              <div className="card-body">
                <h5>  {data.startLocation}</h5>
              <div> {data.endLocation}</div> 

                <br></br>
                <div> {data.id}</div> 
                <br></br>
                <div> {data.numberOfSeats
}</div> 
                <br></br>
               


                  
              </div>
            </div>

);
})}
</div>
<Footer></Footer>
</Layout>
);
}