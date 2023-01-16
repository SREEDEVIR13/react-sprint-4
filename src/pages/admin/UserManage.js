import Sidebar from "../../components/sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import "./UserManage.css"
import { decodeToken } from "react-jwt";
import swal from "sweetalert";

export default function UserManage(){
    const [VehicleList, setVehicleList] = useState([])
    const navi = useNavigate();

    useEffect(() => {
        refreshUserList();
        TokenCheck();
    }, [])

    

    const refreshUserList=()=> {
        //TokenCheck();

        axios.get('http://localhost:8091/api/UserManagement/getallusers')
            .then((Response) => {
                console.log(Response.data)
                setVehicleList(Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const onDelete = (e, vehicleId) => {
        e.preventDefault();
        console.log("vehicleid", vehicleId);
        axios
      .delete(`https://localhost:7149/api/Vehicle/delete/` + vehicleId)
      .then((Response) => {
        swal({
            title: "DELETED!",
            text: " Vehicle Deleted Succesfully ",
            icon: "success",
            button: "ok",
            
              })
        
        
    })
}

    

    const TokenCheck=() => {
  
        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
          localStorage.clear();
          console.log("login redirect")
           loginRedirection();
        } else {
          const { exp } = decodeToken(storeToken);
          const expirationTime = exp * 1000 - 60000;
          if (Date.now() >= expirationTime) {
            localStorage.clear();
            loginRedirection();
          }
        }

    }
    function loginRedirection(){
        console.log("redirection done")
         navi('/admin-login')
       }
    
    return(
        <>
        <Sidebar>
        <div className="header-div">
                <h1>User Management</h1>
            </div>

            <div className="main-div-content">


                <div className="list">
                    {
                        VehicleList.map(data => {
                            return (
                                <div key={data} className="card-div">
                                   
                                    <div className="card-body-div">


                                    <div className="card-image-div">
                                        
                                            <img src={data.profileSrc} className="image-property" />
                                        </div>


                                    <div className="fullname-div">
                                                <h2> {data.firstName}</h2>
                                                <div> {data.lastName}</div>
                                            </div>


                                   
                                            <div className="body-info-div">
                                                <label>Email:</label>
                                                <div> {data.email}</div>
                                            </div>

                                            <div className="body-info-div">
                                                <label>Department:</label>
                                                <div> {data.department}</div>
                                            </div>
                                            <div className="body-info-div">
                                                <label>Number:</label>
                                                <div> {data.number}</div>
                                            </div>
                                        <div>
                                            <div className="body-info-div">
                                                <label>Id:</label>
                                                <div> {data.employeeId}</div>
                                            </div>
                                            <div className="body-info-div">
                                                <label>Gender:</label>
                                                <span> {data.gender}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )

                        })
                    }
                </div>
            </div>
        </Sidebar>
        </>
    )
}