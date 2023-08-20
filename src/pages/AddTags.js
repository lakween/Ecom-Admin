import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import CustomInput from "../Components/CustomInput";

const AddTags = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addTagHandler = () => {
        createDocOfCollection('category', form).then(() => {
            toast.success('Category successfully added', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/admin/list-category')
        }).catch(() => {
            toast.error('Failed to add Category', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    return (
        <div>
            <h3 className="mb-4  title">
                Add Tags
            </h3>
            <div>
                <CustomInput
                    onChng={valueChangeHandler}
                    type="text"
                    name="name"
                    label="Enter Tag"
                    id="blogcat"
                />
                <button onClick={addTagHandler}
                        className="btn btn-success border-0 rounded-3 my-5"
                >Add Tag
                </button>
            </div>
        </div>
    );
}

export default AddTags