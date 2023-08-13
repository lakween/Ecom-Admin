import React from "react";
import CustomInput from "../Components/CustomInput";
import { Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {
    getAuth,
    setPersistence,
    inMemoryPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence
} from "firebase/auth";
const Login = () => {


     const login = async (form, navigate,toast) => {
        try {
            let res = await firebase.auth().signInWithEmailAndPassword('lakweensenathilake@gmail.com','lakween1996')
            const auth = getAuth();
            return res
        } catch (e) {
            toast({
                title: JSON.parse(JSON.stringify(e.code)),
                // description: "We've created your account for you.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return e
        }
    }

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
          />
          <CustomInput
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
            style={{ background: "#ffd333" }}
            type="submit"> Login
          </button>
        </form>
          <button onClick={login}
              // to="/admin"
                  className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                  style={{ background: "#ffd333" }}
                  type="submit"> Login
          </button>
      </div>
    </div>
  );
};

export default Login;
