import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Select} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import {useNavigate} from "react-router-dom";
import {createDocOfCollection} from "../actions/CommonAction";
import {toast} from "react-toastify";
import customAlerts from "../alerts";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


const {Dragger} = Upload;

const Addproduct = () => {

    const [form, setForm] = useState({})
    const [files, setFiles] = useState({})
    const navigate = useNavigate()
    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }

    console.log(files, 'fileList')

    const props = {
        name: 'file',
        multiple: true,
        customRequest: (a) => {
            console.log(a, 'a')
        },
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({file, fileList}) {
            setFiles(fileList?.map((item) => item?.originFileObj || {}))
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const onClickProductHandler = () => {
        uploadFiles().then((urls) => {
            createDocOfCollection('product', {...form, "images": urls}).then((res) => {
                setForm({})
                setFiles({})
                toast.success(customAlerts.product.success, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                window.location.reload();
            }).catch((e) => {
                toast.error(e, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            })
        })

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
            <h3 className="mb-4 title">Add Product</h3>
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
                        id=""
                        onChange={(e, b) => {
                            setForm({...form, 'category': e.target.value})
                        }}
                    >
                        <option value="a">Select Category</option>
                        <option value="b">avc</option>
                        <option value="c">asdr</option>
                    </select>

                    <select
                        name="tags"
                        className="form-control py-3 mb-3"
                        id=""
                        onChange={(e, b) => {
                            setForm({...form, 'tags': e.target.value})
                        }}
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>

                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Select colors"
                        onChange={(e) => {
                            setForm({...form, 'color': e.target.value})
                        }}
                    />
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
                        type="submit"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Addproduct;
