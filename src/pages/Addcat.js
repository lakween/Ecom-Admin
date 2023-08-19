import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Addcat = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addCategoryHandler = ()=>{
        createDocOfCollection('category',form).then(()=>{
            toast.success('Category successfully added', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/admin/list-category')
        }).catch(()=>{
            toast.error('Failed to add Category', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    return (
        <div>
            <h3 className="mb-4  title">
                Add Category
            </h3>
            <div>
                <CustomInput
                    onChng={valueChangeHandler}
                    type="text"
                    name="name"
                    label="Enter Category"
                    id="blogcat"
                />
                <button onClick={addCategoryHandler}
                    className="btn btn-success border-0 rounded-3 my-5"
                     >Add Category
                </button>
            </div>
        </div>
    );
};

export default Addcat;
