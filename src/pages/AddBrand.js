import React, { useEffect, useState } from "react";
import { useQuery ,useQueryClient  } from 'react-query';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import CustomInput from "../Components/CustomInput";
import { createDocOfCollection, updateDocOFCollection } from "../actions/CommonAction";
import { get } from '../service/api.service';
import { BRAND_TAGS } from './../const/tag.const';
import Loading from "./Loading";
import { post ,put } from './../service/api.service';

const AddBrand = () => {
    let {id} = useParams()
    const { isLoading, data } = useQuery([BRAND_TAGS.LIST], async()=>get({api:`brand/${id}`}), {
        staleTime: Infinity
      })
    const [form, setForm] = useState({})
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const getAndSetValues = () => {
        get({api:`brand/${id}`}).then((data)=>{
            setForm(data)
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
                put({body:form,api:`brand/${id}`}).then((data)=>{
                    setLoading(false)
                    queryClient.invalidateQueries({queryKey:[BRAND_TAGS.LIST]})
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

        } else {
            brandSchema.validate(form, {abortEarly: false}).then(() => {
                setLoading(true)
                post({body:form,api:'brands'}).then((data)=>{
                    console.log('res',data)
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