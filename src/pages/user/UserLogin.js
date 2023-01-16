import React, { useEffect, useState } from "react";
import "./UserLogin.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { decodeToken } from "react-jwt";



const initialFieldValues = {

    username: '',
    password: '',

}

export default function UserLogin() {

    const navigate = useNavigate();
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }
    const UserAPI = (url = 'https://localhost:7149/api/Login') => {
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
                console.log(res.data.output)
                onSuccess();
                localStorage.setItem("token", res.data.output);
                TokenCheck();
                console.log("Redirect after login");
                navigate("/home-page")
            })
            .catch(err => console.log(err))
    }




    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "" ) {
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
        navigate('/user-login')
    }



    const validate = () => {
        const err = {};

        if (!values.username) {
            err.username = "Username is Required";
        }

        if (!values.password) {
            err.password = "Password is Required";
        }
        const value = localStorage.getItem("token")
        console.log(value)
        if(value === "wrong password")
        {
            err.password = " User name  or password is wrong"
        }


        return err;


    }

    const resetForm = () => {
        setValues(initialFieldValues)
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
        navigate("/add-user");
    }

    const ForgotPasswordHandler = () => {
        setIsSubmit(true);
        navigate("/forgot-password");
    }


    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {

            const formData = new FormData()
            formData.append('username', values.username)
            formData.append('password', values.password)

            addOrEdit(formData, resetForm)
        }
         
    }, [errors]);

    return (

        <>
            <Layout>
                <div className="login-main-content">
                    <div className="login-title">
                        <header className="login-one">User Login</header>
                    </div>
                    <div className="loginbody-content">
                        <form autoComplete="off" noValidate onSubmit={handleSubmit} className="login-form">


                            <div className="column">
                                <div className="input-box">
                                    <label>Username</label>
                                    <input className={"form-control"} type="text" placeholder="Username" name="username"
                                        value={values.username}
                                        onChange={handleInputChange} required />
                                    <p className="error-text">{errors.username}</p>
                                </div>

                            </div>
                            <div className="column">
                                <div className="input-box">
                                    <label>Password </label>
                                    <input className={"form-control"} placeholder="Password" name="password" type="password"
                                        value={values.password}
                                        onChange={handleInputChange} required />
                                    <p className="error-text">{errors.password}</p>
                                </div>
                            </div>


                            <button >Login</button>


                            <p>
                                New User?
                                <span className="link-btn" onClick={submitHandler}>
                                    <a href="#">Sign Up</a>
                                </span>
                                <span className="fp" onClick={ForgotPasswordHandler}>
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </p>

                        </form>
                    </div>

                </div>

                <Footer />
            </Layout>

        </>

    )

}