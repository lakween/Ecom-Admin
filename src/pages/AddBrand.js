import CustomInput from "../Components/CustomInput";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createDocOfCollection, getDocFromCollection, updateDocOFCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import Loading from "./Loading";
import {array, object, string} from "yup";

const AddBrand = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let {id} = useParams()

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    console.log(form, 'form')

    const getAndSetValues = () => {
        setLoading(true)
        getDocFromCollection('brand', id).then((data) => {
            setForm(data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addBrandHandler = () => {
        if (id) {
            brandSchema.validate(form, {abortEarly: false}).then(() => {
                setLoading(true)
                updateDocOFCollection('brand', id, form).then(() => {
                    toast.success('Brand successfully updated', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    navigate('/admin/list-brand')
                }).catch(() => {
                    toast.error('Failed to Update tag', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }).finally(() => {
                    setLoading(false)
                })
            }).catch((errors) => {
                setLoading(false)
                console.log(errors, 'errors')
                for (let error of errors.inner) {
                    toast.error(error?.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,

                    });
                }
            })

        } else {
            brandSchema.validate(form, {abortEarly: false}).then(() => {
                setLoading(true)
                createDocOfCollection('brand', form).then(() => {
                    toast.success('Brand successfully added', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    navigate('/admin/list-brand')
                }).catch(() => {
                    toast.error('Failed to add brand', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }).finally(() => {
                    setLoading(false)
                })

            }).catch((errors) => {
                setLoading(false)
                console.log(errors, 'errors')
                for (let error of errors.inner) {
                    toast.error(error?.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,

                    });
                }
            })
        }
    }

    return (
        <div>
            <h3 className="mb-4  title">
                {id ? 'Update Brand' : 'Add Brand'}
            </h3>
            {loading ? <Loading/> : (<div>
                <CustomInput
                    onChng={valueChangeHandler}
                    type="text"
                    name="name"
                    value={form?.name || ''}
                    label="Enter brand"
                    id="blogcat"
                />
                <button onClick={addBrandHandler}
                        className="btn btn-success border-0 rounded-3 my-5"
                >{id ? 'Update Brand' : 'Add Brand'}
                </button>
            </div>)}
        </div>
    )
}

export default AddBrand

let brandSchema = object({
    name: string('Fill the form correctly').required('Fill the form correctly')
});