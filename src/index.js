import React from 'react';
import ReactDOM from 'react-dom/client';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import './index.css';
import App from './App';
import firebaseConfig from "./FireBaseConfig";
import {ToastContainer} from "react-toastify";

firebase.initializeApp(firebaseConfig)
firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <App/>
        <ToastContainer
            position="bottom-center"
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
        />
    </>
);

