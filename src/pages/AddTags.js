import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createDocOfCollection, getDocFromCollection, updateDocOFCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import CustomInput from "../Components/CustomInput";

const AddTags = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let {id} = useParams()

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const getAndSetValues = () => {
        setLoading(true)
        getDocFromCollection('tag', id).then((data) => {
            setForm(data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addTagHandler = () => {

        if (id) {
            setLoading(true)
            updateDocOFCollection('tag', id, form).then(() => {
                toast.success('Tag successfully updated', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                navigate('/admin/list-category')
            }).catch(() => {
                toast.error('Failed to Update tag', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).finally(() => {
                setLoading(false)
            })

        } else {
            createDocOfCollection('tag', form).then(() => {
                toast.success('Tag successfully added', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                navigate('/admin/list-tag')
            }).catch(() => {
                toast.error('Failed to add tag', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            })
        }
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
                    value={form?.name}
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