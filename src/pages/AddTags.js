import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDocOfCollection, getDocFromCollection, updateDocOFCollection } from "../actions/CommonAction";
import { toast } from "react-toastify";
import CustomInput from "../Components/CustomInput";
import Loading from "./Loading";
import { object, string } from "yup";
import { useQueryClient } from "react-query";
import { get, post, put } from "../service/api.service";
import { CATEGORY_TAGS, PRODUCT_TAGS, PRODUCT_TAG_TAGS } from "../const/tag.const";

const AddTags = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    let { id } = useParams()

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const getAndSetValues = () => {
        setLoading(true)
        get({ api: `tag/${id}` }).then((data) => {
            setForm(data)

        }).finally(() => {
            setLoading(false)
        })
    }

    const valueChangeHandler = (event) => {
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const addTagHandler = () => {

        if (id) {
            tagSchema.validate(form, { abortEarly: false }).then(() => {
                setLoading(true)

                put({ body: form, api: `tag/${id}` }).then((data) => {
                    setLoading(false)
                    queryClient.invalidateQueries({ queryKey: [PRODUCT_TAG_TAGS.LIST] })
                    navigate('/admin/list-tag')
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
            setLoading(true)
            tagSchema.validate(form, { abortEarly: false }).then(() => {
                post({ body: form, api: 'tag' }).then((data) => {
                    queryClient.invalidateQueries({ queryKey: [PRODUCT_TAG_TAGS.LIST] })
                    setLoading(false)
                }).catch(()=>{
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
                {
                    id ? 'View Tag' : 'Add Tag'
                }
            </h3>
            {
                loading ? <Loading /> : (
                    <div>
                        <CustomInput
                            onChng={valueChangeHandler}
                            type="text"
                            name="name"
                            value={form?.name}
                            label="Enter Tag"
                        />
                        <button onClick={addTagHandler}
                            className="btn btn-success border-0 rounded-3 my-5"
                        >  {
                                id ? 'Add Tag' : 'Update Tag'
                            }
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default AddTags

let tagSchema = object({
    name: string('Fill the Form').required('Fill the Form'),
});
