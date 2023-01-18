import React, { useState, useEffect } from "react";
import "./TripHostedDetails.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import * as Icon from 'react-bootstrap-icons';
import { decodeToken } from "react-jwt";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Id = "SYT877";

export default function TripsHostedDetails() {
  const [tripHosted, setTripHosted] = useState([]);
  const Navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const [CheckRide, setCheckRide] = useState([]);

  const [selectesDate, setSelectedDate]= useState('');
  console.log( "get-date", selectesDate);
  useEffect(() => {
    HostedRidesList();
    // CheckRidesList();
  }, []);



  


  function HostedRidesList() {
    axios
      .get(`https://localhost:7149/api/HostRide/getRides/` + Id)
      .then((Response) => {
        

        setTripHosted(Response.data);
        console.log("ride get", Response.data);
        
       
      })
      .catch((error) => {
        console.log(error);
      });
     
  }
// const handleSelect =(data)=>{

// }




  // const selectionRange = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: 'selection',
  // };
  // function CheckRidesList() {
  //   axios
  //   .get(`https://localhost:7149/api/HostRide/getDetailRide?Id=` + Id)
  //     .then((Response) => {
        

  //       setCheckRide(Response.data);
  //       console.log(" get-checkRide", Response.data);
        
       
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
     
  // }







  const statusCheck = (id) => {
    setIsCheck(true);
    Navigate(`/check-ride/${id}`);
  };


  
  return (
    <>
      <Layout>
        <div className="trip-hosted-container">
          <div className="tp-title">
            <h2>Trips Hosted</h2>
          </div>
          {/* <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      /> */}
          

          <div className="th-filter">
      
            <label>Filter By Date <Icon.Filter className="th-icon"/></label> 
            {/* <input className=" th-data" type="date" /> */}
            <DatePicker selected={ selectesDate}
            onChange={ date=>setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            //minDate={ new Date()}
            //maxDate={ new Date()}
            //filterDate={ date=>date.getDay()!=6 && date.getDay()!=0}
           // isClearable
            showYearDropdown
     
            />     
          </div>
{tripHosted.map((data) => { 
          return ( 
           <div key={data.memberId} className="inside-container"> 
          <div className=" tp-outer-box">
            <div className="tp-detail">
              <div className="th-first">
               <div className="th-row"><h5>from: {data.startLocation}  <Icons.FaMapMarkerAlt/></h5> <br></br></div> 
               <div  className="th-row"><h5>To:  {data.endLocation}   <Icons.FaMapMarkerAlt/></h5></div> 
              </div>
              <div className="th-first">
                <div className="th-row1"> <h5>Date:{data. startDate}</h5><br></br></div>
                <div  className="th-row"><h5>StartTime: {data. startTime}</h5></div>
              </div>
              <div className="check-ride-btn">
                   <button    onClick={() => {
                    statusCheck(data.id);
                    // CheckRidesList();
                  }} className="th-btn">check ride</button>
                {/* <button    onClick={statusCheck} className="th-btn">check ride</button> */}
              </div>
            </div>
          </div>
</div>
          );
})} 
        </div>

        <Footer></Footer>
      </Layout>
    </>
  );
}
