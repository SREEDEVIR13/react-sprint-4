import React, { useState, useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import * as Icon from "react-bootstrap-icons";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CheckRide.css";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

// const Id = "1";

export default function CheckRide() {
  const { id } = useParams();
  console.log("useparams", id);
  const Navigate = useNavigate();
  const [CheckRide, setCheckRide] = useState([]);
  const [invited, setInvited] = useState([]);
  const [Invitedstatusget, setInvitedStatusget] = useState(false);
  const [Acceptedstatusget, setAcceptedStatusget] = useState(false);
  const [Deniedstatusget, setDeniedStatusget] = useState(false);
  // const [data, setData] = useState([false]);
  // const [nodata, setNoData] = useState([false]);
 
  // const status= invited.status;
  // console.log("get-status",status);

  const [isStart, setIsStart] = useState(false);

  const statusStart = () => {
    setIsStart(true);
    Navigate("/start-ride");
  };
  useEffect(() => {
    CheckRidesList(id);
    InvitedDetail(id);
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
    //  const onData=(d)=>{
    //   d.map((d) =>{
    //   if (!d){
    //     setNoData(true);
    //   }
    //   else if (d.data) {
    //     setData (true);}

    //   });

    //  };

  const onLoad = (item) => {
    item.map((items) => {
      console.log("itemstatus",items.status)
      if (items.status == 0) {
        setInvitedStatusget(true);
      } else if (items.status == 1) {
        setAcceptedStatusget(true);
      } else if (items.status == 2) {
        setDeniedStatusget(true);
      }
      
    });
  };


  function InvitedDetail() {
    axios
      .get(`https://localhost:7149/api/HostRide/getInvitedUsers?Id=${id}`)
      .then((Response) => {
        setInvited(Response.data);
        // onData(Response.data);
        onLoad(Response.data);
        // console.log("statusget", invited.status);
        console.log("Invites-get", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Layout>
        <div className="trip-check-container">
          {/* {console.log(zero)} */}
          <div className="cr-title">
            <h2>Check Rides</h2>
          </div>

          {CheckRide.map((data) => {
            return (
              <div key={data.id} className="cr-container">
                <div className="cr-top-container">
                  <div className=" cr-outer-box">
                    <div className="cr-detail">
                      <div className="cr-first">
                        <div className="cr-row">
                          <h4>
                            From: {data.startLocation} <Icons.FaMapMarkerAlt />
                          </h4>
                          <br></br>
                        </div>
                        <div className="cr-row">
                          <h4>
                            To: {data.endLocation} <Icons.FaMapMarkerAlt />
                          </h4>
                        </div>
                      </div>
                      <div className="cr-first">
                        <div className="cr-row">
                          <h4>Number of seat Left: {data.numberOfSeats}</h4>
                          <br></br>
                        </div>
                      </div>
                      <div className="check-buttons">
                        <button onClick={statusStart} className="cr-btn">
                          Start Ride
                        </button>
                        <br></br>
                        <button className="cr-btn">Cancel Ride</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cr-title">
            <h2>You Invited Them To join</h2>
          </div>
          {/* {nodata && <p>No invited Members</p>}
          {data &&  */}
          <div className="cr-middile-container">
            {invited.map((data) => {
              return (
                <div key={data.InvitationId} className="crm-outerbox">
                  {/* <div className="crm-details"> */}
                  <div className="crm-row">
                    {/* <div className="crm-avatar"> </div> */}
                    <img src={data.imageSrc} className="avatar" />
                    {/* <div className="crm-icon"> */}
                    <p> {data.fullName}</p>
                    {/* </div> */}
                    {/* </div> */}
                    {/* <div className="crm-column"> */}
                    {Invitedstatusget && <p> STATUS :Invited </p>}
                    {Acceptedstatusget && <p> STATUS :Accepted </p>}
                    {Deniedstatusget && <p> STATUS :Turned Down </p>}

                  </div>
                  {/* </div> */}
                </div>
              );
            })}
          </div> 


          {/* } */}
          <div className="cr-bottom-container">
            <div className="cr-title">
              <h2>They are requesting to join your Pool</h2>
            </div>

            <div className="cbc-outer-box">
              <div className="cbc-details">
                <div className="cbc-first">
                  <div className="cbc-icon">
                
                    <Icons.FaUser /> <br></br>
                  </div>
                  <div className="cbc-icon">
                  
                    <Icons.FaPhone />
                  </div>
                </div>
                <div className="cbc-first">
                  <div className="cbc-row">
                    <h4>john</h4>
                  </div>
                  <div className="cbc-row">
                    <h4>from: </h4>
                    <h4>To:</h4>
                  </div>
                </div>
              </div>

              <div className="cbc-first">
                <div className="cbc-row">
                  <h4>Accept</h4>{" "}
                </div>
                <div className="cbc-row">
                  <h4>Deny </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </Layout>
    </>
  );
}
