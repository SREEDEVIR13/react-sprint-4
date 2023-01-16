import React, { useState, useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import * as Icon from 'react-bootstrap-icons';
import { decodeToken } from "react-jwt";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import "./CheckRide.css";




// const Id = "1";


export default function CheckRide() {
  const {id}=useParams();
  console.log("useparams",id)
  const Navigate = useNavigate();
    const [CheckRide, setCheckRide] = useState([]);

    const [isStart, setIsStart] = useState(false);

    const statusStart = () => {
      setIsStart(true);
        Navigate("/start-ride");
      };
    useEffect(() => {
        CheckRidesList(id);
       
      }, []);

      function CheckRidesList(id) {
        axios
        .get(`https://localhost:7149/api/HostRide/getDetailRide?Id=${id}`)
          .then((Response) => {
            
    
            setCheckRide(Response.data);
            console.log(" get-checkRide", Response.data);
            
           
          })
          .catch((error) => {
            console.log(error);
          });
         
      }




      return (
        <>
          <Layout>
            <div className="trip-check-container">
              <div className="cr-title">
                <h2>Check Rides</h2>
              </div>



            
             
     {CheckRide.map((data) => { 
              return (  
               <div  key={data.id} className="cr-container"> 
               <div className="cr-top-container">
              <div className=" cr-outer-box">
                <div className="cr-detail">
                  <div className="cr-first">
                   <div className="cr-row"><h4>from:  {data.startLocation}  <Icons.FaMapMarkerAlt/></h4> <br></br></div> 
                   <div  className="cr-row"><h4>To: {data.endLocation} <Icons.FaMapMarkerAlt/></h4></div> 
                  </div>
                  <div className="cr-first">
                    <div className="cr-row"> <h4>Number of seat Left: {data.numberOfSeats}</h4><br></br></div>
                    
                  </div>
                  <div className="check-buttons">
                    <button    onClick={statusStart} className="cr-btn">Start Ride</button><br></br>
                    <button className="cr-btn">Cancel Ride</button>
                  </div>
                </div>
              </div>
 </div>
            

</div>
 );
})} 


            <div className="cr-middile-container">
               <div className="cr-title">
                <h2>You Invited Them To join</h2>
              </div>
<div className="crm-outerbox">


  <div className="crm-details">
  <div className="crm-row">
  <div className="crm-avatar"><Icons.FaUser/> </div>
  <div className="crm-icon"> <h4> john doe</h4> </div>
 
  </div>
  <div className="crm-column">
    <h2>Accepted</h2>
    </div>
    </div>


 <div className="crm-details">
  <div className="crm-row">
  <div className="crm-avatar"><Icons.FaUser/> </div>
  <div className="crm-icon"> <h4> gilbert</h4> </div>
 
  </div>
  <div className="crm-column">
    <h2>Turned Down</h2>
    </div>
    </div>


</div>

</div>



<div className="cr-bottom-container">
               <div className="cr-title">
                <h2>They are requesting to join your Pool</h2>
              </div>

              <div className="cbc-outer-box">
                <div className="cbc-details">
                <div className="cbc-first">
               <div className="cbc-icon"> <Icons.FaUser/> <br></br></div> 
               <div  className="cbc-icon">   <Icons.FaPhone/></div> 
              </div>
              <div className="cbc-first">
               <div className="cbc-row"><h4>john</h4> </div> 
               <div  className="cbc-row"><h4>from: </h4> 
               <h5>to:</h5>
               </div> 
              </div>

                </div>

                <div className="cbc-first">
               <div className="cbc-row"><h4>Accept</h4> </div> 
               <div  className="cbc-row"><h4>Deny   </h4></div> 
              </div>
              </div>

</div>


         </div>

            <Footer></Footer>
          </Layout>
        </>
      );
    }
    

