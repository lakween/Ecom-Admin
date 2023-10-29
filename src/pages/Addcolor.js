import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {object, string} from "yup";
import { useQueryClient } from 'react-query';
import { get, put } from "../service/api.service";
import { CATEGORY_TAGS } from "../const/tag.const";

const Addcolor = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    let { id } = useParams()


    const getAndSetValues = () => {
        setLoading(true)
        get({ api: `color/${id}` }).then((data) => {
            setForm(data)

        }).finally(() => {
            setLoading(false)
        })
    }

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const addColorHandler = () => {
        colourSchema.validate(form, {abortEarly: false}).then(() => {

            put({ body: form, api: `category/${id}` }).then((data) => {
                setLoading(false)
                queryClient.invalidateQueries({ queryKey: [CATEGORY_TAGS.LIST] })
            }).catch(() => {
                setLoading(false)
            })

            // createDocOfCollection('color', form).then(() => {
            //     toast.success('Color successfully added', {
            //         position: toast.POSITION.BOTTOM_CENTER
            //     });

            //     navigate('/admin/list-color')

            // }).catch(() => {
            //     toast.error('Failed to add color', {
            //         position: toast.POSITION.BOTTOM_CENTER
            //     });
            // })

        }).catch((errors) => {
            console.log(errors, 'errors')
            for (let error of errors.inner) {
                toast.error(error?.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,

                });
            }
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

let colourSchema = object({
    color: string('Please Select a colour').required('Please Select a colour')
});
