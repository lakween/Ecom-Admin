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

    const addColorHandler = () => {

        createDocOfCollection('category', form).then(() => {
            toast.success('Category successfully added', {
                position: toast.POSITION.BOTTOM_CENTER
            });

            navigate('list-color')

        }).catch(() => {
            toast.error('Failed to add Category', {
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
                <form action="">
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="color"
                        label="Enter Product Color"
                        id="color"
                    />
                    <button
                        onClick={addColorHandler}
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit">Add Color
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcolor;
