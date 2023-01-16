import React, { useState, useEffect } from "react";
import "./HostRide.css"
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa"
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {useNavigate} from "react-router-dom"



const initialfieldValues = {
    StartLocation: '',
    EndLocation: '',
    StartDate: '',
    StartTime: '',
    VehicleId: '1',
    MemberId: 'SYT865',
    NumberOfSeats: 0
}

export default function HostRide() {

    const [values, setValues] = useState(initialfieldValues);
    const [errors, setErrors] = useState({});
    const [vehicles, setVehicles] = useState([])
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        //GetWheels();
    })

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }
    const validate = (values) => {
        const err = {};
        if (!values.startLocation) {
            err.startLocation = "Start Location is Required";
        }

        if (!values.endLocation) {
            err.endLocation = "End Location is Required";
        }
        return err;

    }
    const resetForm = () => {
        setValues(initialfieldValues)
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        console.log(values.MemberId)
        console.log(values)
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
        feedData();
        navigate("/home-page")
        

    }

    const GetWheels=()=> {
        axios
          .get(`https://localhost:7149/api/Vehicle/getVehicle/SYT865`)
          .then((Response) => {
            setVehicles(Response.data);
            console.log("vehicle-get", Response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const UserAPI = (url = 'https://localhost:7149/api/HostRide/hostyourride') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
            .then(res => {
                onSuccess();
            })
            .catch(err => console.log(err))
    }

    const feedData = () => {
        const formData = new FormData()
        console.log(values.NumberOfSeats)
        formData.append('StartLocation', values.StartLocation)
        formData.append('EndLocation', values.EndLocation)
        formData.append('StartDate', values.StartDate)
        formData.append('StartTime', values.StartTime)
        formData.append('VehicleId', values.VehicleId)
        formData.append('NumberOfSeats', values.NumberOfSeats)
        formData.append('MemberId', values.MemberId)
        const test = {
            'StartLocation': values.StartLocation,
            'EndLocation': values.EndLocation,
            'StartDate': values.StartDate,
            'StartTime': values.StartTime,
            'VehicleId': values.VehicleId,
            'NumberOfSeats': values.NumberOfSeats,
            'MemberId': values.MemberId
        }
        console.log(test)
        addOrEdit(test, resetForm)
    }




    return (
        <><Layout>
            <div className="hr-title">
                <h2>Host a Pool</h2>
            </div>
            <div className="body-content">
                <form autoComplete="off" className="hostaride" onSubmit={handleSubmit}>


                    <div className="input-box">
                        <label>Start Location</label>
                        <input className={"form-control"} type="text" placeholder="Hey,Where do you start?" name="StartLocation"
                                value={values.StartLocation}
                                onChange={handleInputChange} />
                            <p className="error-text">{errors.StartLocation}</p>
                    </div>


                    <div className="column">
                        <div className="input-box">
                            <label>Date</label>
                            <input className={"form-control"} type="date" placeholder="Which Date?" name="StartDate"
                                    value={values.StartDate}
                                    onChange={handleInputChange} required />
                                <p className="error-text">{errors.StartDate}</p>
                        </div>
                        <div className="input-box">
                            <label>Time</label>
                            <input className={"form-control"} type="time" placeholder="And What Time?" name="StartTime"
                                    value={values.StartTime}
                                    onChange={handleInputChange} required />
                                <p className="error-text">{errors.StartTime}</p>
                        </div>
                    </div>
                    <div className="input-box">
                        <label>Destination</label>
                        <input className={"form-control"} type="text" placeholder="Enter your destination" name="EndLocation"
                                value={values.EndLocation}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.EndLocation}</p>
                    </div>
                    <div className="vehicle-add-div">
                        <div className="input-box">
                            <label>Add/Select Wheels </label>
                            <Link className='add-w' to="/add-wheels"><Icons.FaPlusCircle></Icons.FaPlusCircle><i class="fa fa-plus-circle" aria-hidden="true"></i></Link>
                        </div>

                    </div>


                    <div className="column">
                        <div className="input-box">
                            <label>Fare</label>
                            <input type="number" className={"form-control"} placeholder="Fare" name="fare" />
                        </div>
                        <div className="input-box">
                            <label>Select number of seats</label>
                            <div className="select-box">

                                <select type="number" className={"form-control"} placeholder="Number" name="NumberOfSeats" value={values.NumberOfSeats}
                                onChange={handleInputChange} required>
                                    
                                    <option hidden>Number of Seats</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* <div className='invite'>
                        <button >Invite Buddies</button>
                    </div> */}
                    <div className='submit'>
                        <button>Host Pool</button>
                    </div>

                </form>
            </div>
            <Footer></Footer>

            </Layout>
            
        </>
    )
}