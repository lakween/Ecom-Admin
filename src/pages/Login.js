import React, { useContext, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import firebase from "firebase/compat/app";
import { getDocFromCollection } from "../actions/CommonAction";
import { StoreContext } from "../providers/ContextProvider";

const Login = () => {

    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const { getValue } = useContext(StoreContext)
    const uid = getValue('user')?.id
    const type = getValue('user')?.type

    if (uid && type === "admin") navigate('/admin')
    const valueChangeHandler = (event) => {
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }
    const login = async () => {
        try {
            let res = await firebase.auth().signInWithEmailAndPassword(form?.email, form?.password)
            const user = await getDocFromCollection('userProfile', res.user.uid)
            if (user.type == 'admin') navigate('/admin')
            else toast.error('You are not Admin', {
                position: toast.POSITION.BOTTOM_CENTER
            });

        } catch (e) {
            toast.error(JSON.parse(JSON.stringify(e.code)), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    return (
        <div>
            <section className="h-screen">
                <div className="h-full bg-slate-100 p-10">
                    <div
                        className="flex bg-white w-full p-5 items-center justify-center h-full">
                        <div
                            className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image" />
                        </div>

                        <div className="w-full align-middle px-60 py-20 border-amber-50 border rounded-md bg-slate-100">
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
                            <div className="w-full grid place-items-center">
                                <button onClick={login}
                                    className="bg-blue-500 hover:bg-blue-600 w-[300px] py-2 rounded-md"
                                    type="submit"> Login
                                </button>
                            </div>

                        </div>
                    </div>  
                </div>
            </section>
        </div>
    )
}

export default Login;
