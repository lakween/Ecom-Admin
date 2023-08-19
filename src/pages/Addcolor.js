import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Addcolor = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    console.log(form)

    const addColorHandler = () => {

        createDocOfCollection('color', form).then(() => {
            toast.success('Color successfully added', {
                position: toast.POSITION.BOTTOM_CENTER
            });

            navigate('/admin/list-color')

        }).catch(() => {
            toast.error('Failed to add color', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    return (
        <div>
            <h3 className="mb-4 title">
                Add Color
            </h3>
            <div>
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="color"
                        label="Enter Product Color"
                        id="color"
                        name="color"
                    />
                    <button
                        onClick={addColorHandler}
                        className="btn btn-success border-0 rounded-3 my-5"
                        >Add Color
                    </button>
            </div>
        </div>
    );
};

export default Addcolor;
