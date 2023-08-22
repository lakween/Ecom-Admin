import {useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import {useNavigate} from "react-router-dom";
import {getDocFromCollection} from "../../actions/CommonAction";

const useUserLoginInfo = () => {
    let navigate = useNavigate()
    let [model, setModel] = useState()

    useEffect(() => {
        setUsr()
    }, [])

    async function setUsr() {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                let userData = await getDocFromCollection('userProfile', user?.uid);
                if(userData?.type == 'admin') setModel({...userData, id: user?.uid, isLogged: true,photoURL:userData?.photoURL});
                else  navigate('/')
            } else {
                setModel({isLogged: false});
                 navigate('/')
            }
        });
    }

    return model

}

export default useUserLoginInfo