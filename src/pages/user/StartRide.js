import React, { useState, useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import * as Icon from 'react-bootstrap-icons';
import { decodeToken } from "react-jwt";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "./StartRide.css";




export default function StartRide() {
   


    return(
        <><Layout>
            <div className="trip-start-ride">

<div  className="sr-container"> 
               <div className="sr-top-container">
              <div className=" sr-outer-box">
                <div className="sr-detail">
                  <div className="sr-first">
                   <div className="sr-row"><h4>from:  <Icons.FaMapMarkerAlt/></h4> <br></br></div> 
                   <div  className="sr-row"><h4>To: <Icons.FaMapMarkerAlt/></h4></div> 
                  </div>
                  <div className="sr-first">
                    <div className="sr-row"> <h4>Number of seat Left:</h4><br></br></div>
                    
                  </div>
                  <div className="start-button">
                    <button className="sr-btn">End Ride</button><br></br>
                
                  </div>
                </div>
              </div>
 </div>
              {/* );
    })}  */}
</div>

<div className="sr-middile">
<div className="sr-left-side">
    <div className="sr-left-data">
        <div className="sr-data"> To be Recieved</div>
        <div className="sr-data"> Rs 90.00</div>
       
    </div>
</div>

{/* <div className="sr-right-side"></div>
 i am ride */}


<div className="sr-bottom-container">
               <div className="sr-title">
                <h2>co-passengers</h2>
              </div>

              <div className="sbc-outer-box">
                <div className="sbc-details">
                <div className="sbc-first">
               <div className="sbc-icon"> <Icons.FaUser/> <br></br></div> 
               <div className="sbc-icon"> Name</div>
               <div  className="sbc-icon">   <Icons.FaPhone/></div> 
              </div>
              <div className="sbc-first">
               <div className="sbc-row"><h4>rs 30.00</h4> </div> 
               <div  className="sbc-row"><h4>paid: </h4> 
              
               </div> 
              </div>

                </div>
                <div className="sbc-details">
                <div className="sbc-first">
               <div className="sbc-icon"> <Icons.FaUser/> <br></br></div> 
               <div className="sbc-icon"> Name</div>
               <div  className="sbc-icon">   <Icons.FaPhone/></div> 
              </div>
              <div className="sbc-first">
               <div className="sbc-row"><h4>rs 30.00</h4> </div> 
               <div  className="sbc-row"><h4>paid: </h4> 
              
               </div> 
              </div>

                </div>
               
              </div>

</div>
</div>


            </div>
        </Layout>
        </>
    )




}
