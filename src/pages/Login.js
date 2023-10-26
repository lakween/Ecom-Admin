import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../Components/CustomInput";
import { post } from '../service/api.service';
import image from '../asset/images/background-login.jpg'

const Login = () => {

    // const mutation = useMutation(post, {
    //     onSuccess: (data) => {
    //        console.log(error,'data');
    //       },
    //     onError:(error)=>{
    //         console.log(error.message,'data');
    //     }
    //   })

    const [form, setForm] = useState({})
    const navigate = useNavigate()

    const valueChangeHandler = (event) => {
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }
    const login = () => {
        post({ body: form, api: 'login' }).then((response) => {
            const bearerToken = response.headers.get('Authorization')
            sessionStorage.setItem('bearerToken', bearerToken)
            navigate('/admin')
        }).catch((e) => {
            console.log(e)
            toast.error(e.response.data.error, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })

        // mutation.mutate({body:{
        //     userName:'lakween',
        //     password:'lakween1996'
        // },api:'login'})
    }

    return (
        <div>
            <section className="h-screen">
                <div className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-blue-700 px-[11rem] py-2">
                    <div
                        className="flex bg-white rounded-lg items-center justify-start h-full" style={{ boxShadow: '0 0 20px 6px' }}>
                        <div className="w-[70%] h-full  border-tl-full border-bl-full border-tr-full border-r-0" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                            <div className=" flex gap-10 flex-col items-center justify-center border-tl-full border-bl-full border-tr-full border-r-0 bg-[#37373ead] w-full h-full">
                            <h1 className="text-[100px] font-bold">Welcome Back</h1>
                                <div>
                                   
                                    <br></br>
                                    <h2>Please log in to your admin account to manage your e-commerce business with ease.</h2>
                                    <br></br>
                                    <p>- Manage Products</p>
                                    <p>- Customer Data</p>
                                    <p>- View Sales Reports</p>
                                    <p>- Support Center</p>
                                    <br></br>
                                    Need assistance? Contact Support

                                </div>
                            </div>
                            {/* <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image" /> */}
                        </div>

                        <div className="w-[30%] h-full">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 w-full flex justify-center items-center">
                                    <h1 className="text-center font-[Poppins] font-bold text-[100px]">Login</h1>
                                </div>
                                <div className="flex-1 px-10 flex items-end pb-4">
                                    <div className="w-full">
                                        <p className=" mb-[150px] text-gray-400">Don't have an account? Creat Your Account it takes less than a minute</p>
                                        <CustomInput
                                            onChng={valueChangeHandler}
                                            type="text"
                                            label="Email Address"
                                            id="userName"
                                            name="userName"
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

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
