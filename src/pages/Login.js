import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";
import {Link, useNavigate} from "react-router-dom";

import firebase from "firebase/compat/app";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {
    getAuth
} from "firebase/auth";

const Login = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }
    const login = async () => {
        try {
            let res = await firebase.auth().signInWithEmailAndPassword(form?.email, form?.password)
            const auth = getAuth();
            navigate('/admin')
            return res
        } catch (e) {
            // toast({
            //     title: JSON.parse(JSON.stringify(e.code)),
            //     // description: "We've created your account for you.",
            //     status: 'error',
            //     duration: 2000,
            //     isClosable: true,
            // })
            return e
        }
    }

    return (
        <div className="py-5" style={{background: "#ffd333", minHeight: "100vh"}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <CustomInput
                    onChng={valueChangeHandler}
                    type="text"
                    label="Email Address"
                    id="email"
                    name="email"
                />
                <CustomInput
                    onChng={valueChangeHandler}
                    type="password"
                    label="Password"
                    id="pass"
                    name="password"
                />
                <div className="mb-3 text-end">
                    <Link to="forgot-password" className="">
                        Forgot Password?
                    </Link>
                </div>
                <button onClick={login}
                    // to="/admin"
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{background: "#ffd333"}}
                        type="submit"> Login
                </button>
            </div>
        </div>
    );
};

export default Login;
