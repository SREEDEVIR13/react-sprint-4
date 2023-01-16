import React, { useEffect, useState } from "react";
import "./AddUser.css"
import { useNavigate } from "react-router-dom";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import axios from "axios";

const defaultImageSrc = "/img/userlogo.jpg"

const initialFeildValues = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    email: '',
    number: 0,
    password: '',
    confirmPassword: '',
    gender: '',
    department: '',
    role: 'User',

    profileName: '',
    profileSrc: defaultImageSrc,
    profileFile: null,

    lisenceName: '',
    lisenceSrc: defaultImageSrc,
    lisenceFile: null
}

export default function AddUser() {

    const navigate = useNavigate();


    const [values, setValues] = useState(initialFeildValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const UserAPI = (url = 'https://localhost:7149/api/Registration/register') => {
        return{
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
        .then(res =>{
            onSuccess();
        })
        .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    lisenceFile: imageFile,
                    lisenceSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                lisenceFile: null,
                lisenceSrc: defaultImageSrc
            })
        }
    }

    const profileUpdate = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    profileFile: imageFile,
                    profileSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                profileFile: null,
                profileSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        const err = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const idRegex = /^SYT{1}[0-9]{3,4}$/gm;
        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        if (!values.firstName) {
            err.firstName = "First Name is Required";
        }

        if (!values.lastName) {
            err.lastName = "Last Name is Required";
        }
        if (!values.email) {
            err.email = "Email is Required";
        }
        else if (!emailRegex.test(values.email)) {
            err.email = "Email is not valid"
        }
        if (!values.password) {
            err.password = "Password is Required";
        }
        else if (!pwdRegex.test(values.password)) {
            err.password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
        }
        if (values.confirmPassword !== values.password) {
            err.confirmPassword = "Password's doesnt match"
        }
        if (!values.department) {
            err.department = "Department is Required";
        }
        if (!values.employeeId) {
            err.employeeId = "Employee Id is Required";
        }
        else if (!idRegex.test(values.employeeId)) {
            err.employeeId = "Invalid Employee Id"
        }
        if (!values.number) {
            err.number = "number is Required";
        }
        else if ((values.number).length < 10 || values.number.length > 10) {
            err.number = "number should be 10 digit";
        }
        if (!values.gender) {
            err.gender = "Please select gender";
        }
        if (values.profileSrc == defaultImageSrc) {
            err.profileSrc = "select Profile picture"
        }

        return err;


    }

    const resetForm = () => {
        setValues(initialFeildValues)
        document.getElementById('image-uploader').value = null;
        document.getElementById('license-uploader').value = null;
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

    }

    const submitHandler = () => {
        setIsSubmit(true);
        navigate("/user-login");
    }



    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {

            const formData = new FormData()
            formData.append('lisenceName', values.lisenceName)
            formData.append('lisenceFile', values.lisenceFile)
            formData.append('profileName', values.profileName)
            formData.append('profileFile', values.profileFile)
            formData.append('firstname', values.firstName)
            formData.append('lastName', values.lastName)
            formData.append('email', values.email)
            formData.append('password', values.password)
            formData.append('department', values.department)
            formData.append('number', values.number)
            formData.append('gender', values.gender)
            formData.append('employeeId', values.employeeId)
            formData.append('role', values.role)

            addOrEdit(formData, resetForm)
        }
    }, [errors]);

    return (

        <>
            <Layout>
            <div className="adduser-main-content">
            <div className="header-title">
                <header className="header-one">Create New Account</header>
            </div>
            <div className="body-content">
                <form autoComplete="off" noValidate onSubmit={handleSubmit} className="signup-form">

                    <div className="image-tag" >
                        <img src={values.profileSrc} height="100px" width="100px" />
                        <input type="file" accept="image/*" className={"form-control-file"}
                            onChange={profileUpdate} id="license-uploader" />
                        <p className="error-text">{errors.profileSrc}</p>

                    </div>
                    <div className="column">
                        <div className="input-box">
                            <label>First Name</label>
                            <input className={"form-control"} type="text" placeholder="First Name" name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.firstName}</p>
                        </div>

                        <div className="input-box">
                            <label>Last Name</label>
                            <input className={"form-control"} placeholder="LastName" name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange} />
                            <p className="error-text">{errors.lastName}</p>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-box">
                            <label>Email Address</label>
                            <input className={"form-control"} placeholder="Email" name="email"
                                value={values.email}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.email}</p>
                        </div>
                        <div className="input-box">
                            <label>Phone Number</label>
                            <input type="number" className={"form-control"} placeholder="Number" name="number"
                                value={values.number}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.number}</p>
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="column">
                            <div className="one-heading">
                                <label>Gender</label>
                            </div>
                            <div className="one-heading">
                                <label>License</label>
                            </div>
                        </div>

                        <div className="column">

                            <div className="select-box">
                                <select
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleInputChange} >
                                    <option hidden>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Prefer not to say</option>
                                </select>
                                <p className="error-text">{errors.gender}</p>
                            </div>
                            <input type="file" accept="image/*"
                                onChange={showPreview} id="image-uploader" />

                        </div>
                    </div>



                    <div className="column">


                        <div className="input-box">

                            <label>Department</label>
                            <div className="select-box">
                                <select
                                    name="department"
                                    value={values.department}
                                    onChange={handleInputChange} >
                                    <option hidden>Department</option>
                                    <option>Delivery</option>
                                    <option>IT</option>
                                    <option>Admin</option>
                                    <option>HR</option>
                                </select>
                                <p className="error-text">{errors.department}</p>
                            </div>


                        </div>
                        <div className="input-box">
                            <label>Employee ID</label>
                            <input type="text" className={"form-control" } placeholder="Employee Id" name="employeeId"
                                value={values.employeeId}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.employeeId}</p>
                        </div>

                    </div>

                    <div className="column">
                        <div className="input-box">
                            <label>Password</label>
                            <input type="password" className={"form-control" } placeholder="Password" name="password"
                                value={values.password}
                                onChange={handleInputChange} />
                            <p className="error-text">{errors.password}</p>

                        </div>
                        <div className="input-box">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Password" name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleInputChange} />
                            <p className="error-text">{errors.confirmPassword}</p>
                        </div>
                    </div>
                    <button >Sign Up</button>

                    <p>
                        Already Registered?
                        <span className="link-btn" onClick={submitHandler}>
                            <a href="#">Sign In</a>
                        </span>
                    </p>

                </form>
            </div>
            </div>
            <Footer></Footer>
           </Layout>
           

        </>
    )

}