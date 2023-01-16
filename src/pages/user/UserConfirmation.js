import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Footer from "../../components/footer/footer";
import Layout from "../../components/navbar/navbar";
import { decodeToken } from "react-jwt";
import axios from "axios";

const initialFieldValues = {

    Email: ''

}
export default function UserConfirmation() {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [tempMail, setTempMail] = useState('')

    const navigate = useNavigate();

    const search = useLocation().search;
    const token = new URLSearchParams(search).get("id")

    useEffect(() => {
        tokenCheck();
    }, []);

    const tokenCheck = () => {
        const { Email } = decodeToken(token);
        console.log(Email)
        const userMail = Email;
        setTempMail(userMail);
        console.log(tempMail)

        values.Email = tempMail;
        console.log(values.Email)
    }
    

    const resetForm = () => {
        setValues('')
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        feedData();
        navigate("/user-login");

    }
    const postUrl = 'https://localhost:7149/api/Registration/Confirm-user?email=' + tempMail;
    console.log('https://localhost:7149/api/Registration/Confirm-user?email=' + tempMail)
    const UserAPI = (url = postUrl) => {
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
                console.log("User Added Successfully!")
                onSuccess();
            })
            .catch(err => console.log(err))
    }



    const feedData = () => {
        const formData = new FormData()

        formData.append('Email', values.Email)

        addOrEdit(formData, resetForm)

    }

    return (
        <>
            <Layout>
                <Footer>
                    <div className="userconfirm-div">
                    <form autoComplete="off" noValidate onSubmit={handleSubmit} className="userconfirm-form">
                        
                        <h2>Congratulations, you have been registered</h2>
                        <div>
                            <h3>Dedirect To Login</h3>
                            <button>Redirect</button>
                        </div>
                        </form>
                    </div>
                </Footer>
            </Layout>
        </>
    )
}