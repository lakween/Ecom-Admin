import React, {useEffect, useState} from "react";
import CustomInput from "../Components/CustomInput";
import {createDocOfCollection, getDocFromCollection, updateDocOFCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "./Loading";

const Addcat = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let {id} = useParams()

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const getAndSetValues = () => {
        setLoading(true)
        getDocFromCollection('category', id).then((data) => {
            setForm(data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const addCategoryHandler = () => {

        if (id) {
            setLoading(true)
            updateDocOFCollection('category', id, form).then(() => {
                toast.success('Category successfully updated', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                navigate('/admin/list-category')
            }).catch(() => {
                toast.error('Failed to Update Category', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).finally(() => {
                setLoading(false)
            })

        } else {
            setLoading(true)
            createDocOfCollection('category', form).then(() => {
                toast.success('Category successfully added', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                navigate('/admin/list-category')
            }).catch(() => {
                toast.error('Failed to add Category', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <div>
            <h3 className="mb-4  title">
                {id ? 'View Category' : 'Add Category'}

            </h3>
            {
                loading ? <Loading/> : (
                    <div>
                        <CustomInput
                            onChng={valueChangeHandler}
                            type="text"
                            value={form?.name}
                            name="name"
                            label="Enter Category"
                            id="blogcat"
                        />
                        <button onClick={addCategoryHandler}
                                className="btn btn-success border-0 rounded-3 my-5"
                        >{id ? 'Update Category' : 'Add Category'}
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default Addcat;
