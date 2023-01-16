import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import "./ForgotPassword.css"
import Footer from "../../components/footer/footer";

const initialFieldValues = {


    Name: 'test',
    Email: '',
    Role: 'User',

}

export default function ForgotPassword() {

    const search = useLocation().search;
    const email = new URLSearchParams(search).get('id');
    console.log(email);

    const navigate = useNavigate();

    const UserAPI = (url = 'https://localhost:7149/api/ForgotPassword/forgotpassword') => {
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
                console.log("hello")
                onSuccess();
            })
            .catch(err => console.log(err))
    }

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





    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({ errors })
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setIsSubmit(true);
        feedData();
        navigate("/check-mail")

    }



    const feedData = () => {
        const formData = new FormData()
        formData.append('Name', values.Name)
        formData.append('Email', values.Email)
        formData.append('Role', values.Role)
        console.log("before add or edit")
        console.log("data", formData)
        addOrEdit(formData, resetForm)


    }




    return (
        <>
            <Layout>
                <div className="fp-page">
                    <h2>Enter Email</h2>
                    <div>
                        <form autoComplete="off" noValidate onSubmit={handleSubmit} className="fp-form">

                            <label>Email Address</label>
                            <input className={"form-control"} placeholder="Enter Email" name="Email"
                                value={values.Email}
                                onChange={handleInputChange} required />
                            <p className="error-text">{errors.email}</p>
                            <button className="submit-button" >Send Mail</button>

                        </form>
                    </div>

                </div>
            <Footer />

            </Layout>
        </>
    )
}

