import CustomInput from "../Components/CustomInput";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";

const AddBrand = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addBrandHandler = () => {
        createDocOfCollection('brand', form).then(() => {
            toast.success('Brand successfully added', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/admin/list-brand')
        }).catch(() => {
            toast.error('Failed to add brand', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    return (
        <div>
            <h3 className="mb-4  title">
                Add Brand
            </h3>
            <div>
                <CustomInput
                    onChng={valueChangeHandler}
                    type="text"
                    name="name"
                    label="Enter brand"
                    id="blogcat"
                />
                <button onClick={addBrandHandler}
                        className="btn btn-success border-0 rounded-3 my-5"
                >Add Brand
                </button>
            </div>
        </div>
    )
}

export default AddBrand