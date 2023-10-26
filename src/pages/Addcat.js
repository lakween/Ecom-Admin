import React, { useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import CustomInput from "../Components/CustomInput";
import { CATEGORY_TAGS } from "../const/tag.const";
import { get, post, put } from './../service/api.service';
import Loading from "./Loading";

const Addcat = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    let { id } = useParams()

    const valueChangeHandler = (event) => {
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const getAndSetValues = () => {
        setLoading(true)
        get({ api: `category/${id}` }).then((data) => {
            setForm(data)

        }).finally(() => {
            setLoading(false)
        })
    }

    const addCategoryHandler = () => {

        if (id) {
            setLoading(true)
            categorySchema.validate(form, { abortEarly: false }).then(() => {
                put({ body: form, api: `category/${id}` }).then((data) => {
                    setLoading(false)
                    queryClient.invalidateQueries({ queryKey: [CATEGORY_TAGS.LIST] })
                }).catch(() => {
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
            categorySchema.validate(form, { abortEarly: false }).then(() => {
                post({ body: form, api: 'category' }).then((data) => {
                    queryClient.invalidateQueries({ queryKey: [CATEGORY_TAGS.LIST] })
                    console.log('res', data)
                })


            }).catch((errors) => {
                setLoading(false)
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
                {id ? 'View Category' : 'Add Category'}

            </h3>
            {
                loading ? <Loading /> : (
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

let categorySchema = object({
    name: string('Fill the Form').required('Fill the Form'),
});

