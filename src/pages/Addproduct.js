import React, {useEffect, useState} from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Select, Spin, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import {
    createDocOfCollection, getAllDocFromCollection, getDocFromCollection, updateDocOFCollection
} from "../actions/CommonAction";
import {toast} from "react-toastify";
import customAlerts from "../alerts";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


const {Dragger} = Upload;

const Addproduct = () => {

    const [form, setForm] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(false)
    const [colours, setColors] = useState([])
    const [files, setFiles] = useState([])
    let {id} = useParams()

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    useEffect(() => {
        getInitalData()
    }, []);

    const getInitalData = () => {
        getAllDocFromCollection('color').then((data) => {
            setColors(data || [])
        })
        getAllDocFromCollection('category').then((data) => {

            setCategoryList(data || [])
        })
    }
    const getAndSetValues = () => {
        setLoading(true)
        getDocFromCollection('product', id).then((data) => {
            setForm(data)
        }).finally(() => {
            setLoading(false)
        })

    }
    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const props = {
        name: 'file', multiple: true, defaultFileList: form?.images?.map((file, index) => ({
            uid: index, name: 'under developing', status: 'done', response: 'Server Error 500', // custom error message to show
            url: file,
        })),

        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({file, fileList}) {
            setFiles(fileList?.map((item) => item?.originFileObj || {}))
        }, onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const onClickProductHandler = () => {
        setLoading(true)
        if (id) {
            updateDocOFCollection('product', id, form).then(() => {
                toast.success('Updated Product successfully', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).catch(() => {
                toast.error('Updated Product fails', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).finally(() => {
                setLoading(false)
            })

        } else {
            setLoading(true)
            uploadFiles().then((urls, a) => {
                setLoading(true)
                createDocOfCollection('product', {...form, "images": urls}).then((res) => {
                    setForm({})
                    setFiles({})
                    toast.success(customAlerts.product.success, {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    window.location.reload();
                }).catch((e) => {
                    toast.error(e, {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }).finally(() => {
                    setLoading(false)
                })
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onDeselectHandler = (value) => {
        let colours = Array.isArray(form?.colors) ? form?.colors?.filter((col) => (col !== value)) : []
        setForm({...form, 'colors': colours})
    }

    const onselectHandler = (value) => {
        let colours = Array.isArray(form?.colors) ? [...form?.colors, value] : [value]
        setForm({...form, 'colors': colours})
    }
    const uploadFiles = async () => {
        let fileUrls = []
        if (files.length > 0) {
            for (let file of files) {
                const storage = getStorage();
                const fileRef = ref(storage, `products/${Math.floor(Math.random() * 1000) + file.name}`);
                const snapshot = await uploadBytes(fileRef, file);
                let fileUrl = await getDownloadURL(fileRef);
                fileUrls.push(fileUrl)
            }
        }
        return fileUrls
    }

    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>{
            loading ?
                <div className="d-flex justify-content-center align-items-center " style={{minHeight: '70vh'}}><Spin
                    style={{minHeight: '100%', width: '100%'}}/></div> :
                <div>
                    <div
                        className="d-flex gap-3 flex-column"
                    >
                        <CustomInput
                            onChng={valueChangeHandler}
                            type="text"
                            label="Enter Product Title"
                            name="title"
                            value={form?.title}
                        />
                        <div className="">
                            <ReactQuill
                                theme="snow"
                                value={form?.description}
                                onChange={(value, a, b, c, d) => {
                                    setForm({...form, 'description': value})
                                }}
                            />
                        </div>
                        <CustomInput
                            type="number"
                            onChng={valueChangeHandler}
                            label="Enter Product Price"
                            name="price"
                            value={form?.price}
                        />
                        <select
                            name="brand"
                            onChange={(e, b) => {
                                setForm({...form, 'brand': e.target.value})
                            }}
                            value={form?.brand}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="1">Select Brand</option>
                            <option value="2">Test One Brand</option>
                            <option value="3">Test two Barnd</option>
                            <option value="4">Test three Band</option>
                        </select>

                        <select
                            name="category"
                            className="form-control py-3 mb-3"
                            value={form?.category}
                            onChange={(e, b) => {
                                setForm({...form, 'category': e.target.value})
                            }}
                        >
                            <option value="">Select Category</option>
                            {categoryList?.map((item) => <option value={item.id}>{item.name}</option>)}
                        </select>

                        <select
                            name="tags"
                            className="form-control py-3 mb-3"
                            id=""
                            value={form.tags}
                            onChange={(e, b) => {
                                setForm({...form, 'tags': e.target.value})
                            }}
                        >
                            <option value="" disabled>
                                Select Category
                            </option>

                        </select>

                        <Select
                            mode="multiple"
                            value={form?.colors}
                            allowClear
                            className="w-100"
                            placeholder="Select colors"
                            onDeselect={onDeselectHandler}
                            onSelect={onselectHandler}
                        >
                            {colours?.map((item) => <option value={item.id}>
                                <div style={{
                                    backgroundColor: item?.color, height: "15px", width: "15px", borderRadius: '100%'
                                }}></div>
                            </option>)}
                        </Select>
                        <CustomInput
                            onChng={valueChangeHandler}
                            type="number"
                            label="Enter Product Quantity"
                            name="quantity"
                            value={form?.quantity}
                        />
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or
                                other
                                banned files.
                            </p>
                        </Dragger>
                        <button
                            onClick={onClickProductHandler}
                            className="btn btn-success border-0 rounded-3 my-5"
                        >
                            {id ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </div>}
        </div>);
};

export default Addproduct;
