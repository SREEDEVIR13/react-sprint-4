import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Wheels.css";
import * as Icons from "react-icons/fa";

import axios from "axios";
import swal from "sweetalert";

import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import'./PopUp.css';
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { decodeToken } from "react-jwt";



const Id = "SYT877";

export default function Wheels() {
  const [openModal, setOpenModal] = useState(false);
  const Navigate = useNavigate();
  const { VehicleOwnerId } = useParams();
  const [VehicleList, setVehicleList] = useState([]);
  const [searchParams] = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("vehicledelete", VehicleList.VehicleId);


  useEffect(() => {
    refreshVehicleList();
    TokenCheck();
  }, [VehicleOwnerId]);

  const TokenCheck = () => {

    const storeToken = localStorage.getItem("token");
    if (storeToken === null || "") {
        localStorage.clear();
        //LoginRedirect();
        console.log("login redirect")
        loginRedirection();
    } else {
        const { exp } = decodeToken(storeToken);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
            localStorage.clear();
            //LoginRedirect();
            loginRedirection();
        }
    }

}
function loginRedirection() {
    console.log("Redirected to user login.Please login again")
    Navigate('/user-login')
}


  function refreshVehicleList() {
    axios
      .get(`https://localhost:7149/api/Vehicle/getVehicle/` + Id)
      .then((Response) => {
        

        setVehicleList(Response.data);
        console.log("vehicle-get", Response.data);
       
      })
      .catch((error) => {
        console.log(error);
      });
     
  }



  


  const onDelete = (e, vehicleId) => {
    e.preventDefault();
    console.log("delete");
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
        refreshVehicleList();
        console.log("vehicle-get", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenModal(false);
  };

  const submitHandler = () => {
    setIsSubmit(true);
    Navigate("/add-wheels");
  };

  const setModalClose = () => {
    setOpenModal(false);
  };

  
  return (
    <Layout>
    <div className="list arrangeElement">
      {VehicleList.map((data) => {
        return (
          <div key={data.vehicleId} className="RowArrange">
            <div className="card">
               
              <li key={data.vehicleId}></li>
              <img
                src={data.imageSrc}
                className="card-img-top rounded-circle vehicle-image"
              />
              <div className="card-body">
                <h5> {data.vehicleName}</h5>
                <h5> {data.vehicleNumber}</h5>
                <br></br>
                <h5> {data.vehicleType}</h5>
                <br></br>
                <h5> {data.numberOfSeats}</h5>
                <br></br>
                <h5> {data.vehicleOwnerId}</h5>
                <br></br>

                <button
                  className="btn btn-light delete-button"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <Icons.FaTrash color="red" />
                </button>
                <Modal show={openModal} onHide={setModalClose}  className='modalContainer'>
                  <Modal.Header>
                    <Modal.Title>Delete Vehicle</Modal.Title>
                    <div className='titleCloseBtn'> <button onClick={()=> setModalClose(false)}> x</button></div>
                  </Modal.Header>
                  <Form  onSubmit={(e) => onDelete(e, parseInt(data.vehicleId))}
                    >
                  <Modal.Body className="title">
                    
                     
                      <div className='title'> Do you really want to delete ? </div>
                    
                  </Modal.Body>
                  <Modal.Footer className='footer' >
                    <div>
                      <button type="submit" id="YesBtn">
                        Yes
                      </button>
                      <button type="button" onClick={setModalClose} id="cancelBtn">
                        No
                      </button>
                    </div>
                  </Modal.Footer>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
        );
      })}
     
      
    </div>
    <div className="add"><button  type="button" onClick={submitHandler} className="AddVehicle">
       Add  New vehicle
        <Icons.FaPlus className="add-vehicle" size="3rem"  color="blue" />
      </button></div>
    <Footer></Footer>
    </Layout>
  );
}
