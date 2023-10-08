import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Spin, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import {
    createDocOfCollection,
    getAllDocFromCollection,
    getDocFromCollection,
    updateDocOFCollection
} from "../actions/CommonAction";
import { toast } from "react-toastify";
import customAlerts from "../alerts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { array, object, string } from "yup";

const { Dragger } = Upload;

const Addproduct = () => {

    const [form, setForm] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(false)
    const [colours, setColors] = useState([])
    const [tags, setTags] = useState([])
    const [brands, setBrands] = useState([])
    const [files, setFiles] = useState([])
    let { id } = useParams()

    const { Option } = Select

    useEffect(() => {
        if (id) getAndSetValues()
        else {
            setForm({})
        }

        return () => {
            setForm({})
        }
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
        getAllDocFromCollection('tag').then((data) => {
            setTags(data || [])
        })
        getAllDocFromCollection('brand').then((data) => {
            setBrands(data || [])
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
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const props = {
        name: 'file', multiple: true, defaultFileList: form?.images?.map((file, index) => ({
            uid: index, name: file, status: 'done', response: 'Server Error 500', // custom error message to show
            url: file,
        })),

        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file?.status === 'removed' && id) {
                const images = form?.images.splice(file.uid, 1)
                console.log(form, 'images')
                setForm({ ...form })
            }
            setFiles(fileList?.map((item) => item?.originFileObj || {}))
        }, onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    console.log(files, 'files')

    const onClickProductHandler = () => {
        setLoading(true)
        if (id) {
            productSchema.validate(form, { abortEarly: false }).then(() => {
                uploadFiles().then((urls) => {
                    let images = form?.images ? form?.images : []
                    updateDocOFCollection('product', id, { ...form, "images": [...images, ...urls] }).then(() => {
                        toast.success('Updated Product successfully', {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        window.location.reload();
                    }).catch(() => {
                        toast.error('Updated Product fails', {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    }).finally(() => {
                        setLoading(false)
                    })

                    setLoading(false)

                }).catch(() => {
                    toast.error('Updated Product fails', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
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
            productSchema.validate(form, { abortEarly: false }).then(() => {
                uploadFiles().then((urls) => {
                    setLoading(true)
                    createDocOfCollection('product', { ...form, "images": urls }).then(() => {
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

    const onDeselectHandler = (value) => {
        let colours = Array.isArray(form?.colors) ? form?.colors?.filter((col) => (col !== value)) : []
        setForm({ ...form, 'colors': colours })
    }

    const onselectHandler = (value) => {
        let colours = Array.isArray(form?.colors) ? [...form?.colors, value] : [value]
        setForm({ ...form, 'colors': colours })
    }

    const onDeselectTagHandler = (value) => {
        let tags = Array.isArray(form?.tags) ? form?.tags?.filter((tag) => (tag !== value)) : []
        setForm({ ...form, 'tags': tags })
    }

    const onselectTagHandler = (value) => {
        let tags = Array.isArray(form?.tags) ? [...form?.tags, value] : [value]
        setForm({ ...form, 'tags': tags })
    }
    const uploadFiles = async () => {
        let fileUrls = []
        if (files.length > 0) {
            for (let file of files) {
                if( Object.keys(file).length === 0) continue
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
            <h3 className="mb-4 title">{id ? 'View Product' : 'Add Product'}</h3>{
                loading ?
                    <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '70vh' }}><Spin
                        style={{ minHeight: '100%', width: '100%' }} /></div> :
                    <div>
                        <div
                            className="d-flex gap-3 flex-column"
                        >
                            <CustomInput
                                onChng={valueChangeHandler}
                                type="text"
                                label="Enter Product Title"
                                name="title"
                                value={form?.title || ''}
                            />
                            <div className="">
                                <ReactQuill
                                    theme="snow"
                                    value={form?.description}
                                    onChange={(value, a, b, c, d) => {
                                        setForm({ ...form, 'description': value })
                                    }}
                                />
                            </div>
                            <CustomInput
                                type="number"
                                onChng={valueChangeHandler}
                                label="Enter Product Price"
                                name="price"
                                value={form?.price || ''}
                            />
                            <div className="d-flex ms-1 w-100  gap-5">
                                <div>
                                    <label htmlFor={'category'}>Category</label>
                                    <Select
                                        style={{ width: '200px' }}
                                        placeholder={'category'}
                                        name="category"
                                        className="ms-2 w-250"
                                        value={form?.category || ''}
                                        id={'category'}
                                        onChange={(e, { value }) => {
                                            setForm({ ...form, "category": value })
                                        }}
                                    >
                                        {categoryList?.map((item) => <Option key={item.id}
                                            value={item.id}>{item.name}</Option>)}
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor={'brand'}>brand</label>
                                    <Select
                                        style={{ width: '200px' }}
                                        value={form?.brand}
                                        allowClear
                                        name={"brand"}
                                        id={'brand'}
                                        className="ms-2 min-w-[200px]"
                                        placeholder="Select brand"
                                        onChange={(e, { key, value }) => {
                                            setForm({ ...form, brand: value })
                                        }}
                                    >

                                        {
                                            brands?.map((items) => (
                                                <Option key={items?.id} value={items?.id}>
                                                    {items?.name}
                                                </Option>
                                            ))
                                        }

                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor={'Tags'}>Tags</label>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '200px' }}
                                        value={form?.tags}
                                        allowClear
                                        className="ms-2 min-w-[200px]"
                                        placeholder="Select Tags"
                                        onDeselect={onDeselectTagHandler}
                                        onSelect={onselectTagHandler}
                                    >

                                        {
                                            tags?.map((items) => (
                                                <Option value={items?.id}>
                                                    {items?.name}
                                                </Option>
                                            ))
                                        }

                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor={'colors'}>Colors</label>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '200px' }}
                                        value={form?.colors}
                                        allowClear
                                        className="ms-2 min-w-[200px]"
                                        placeholder="Select colors"
                                        onDeselect={onDeselectHandler}
                                        onSelect={onselectHandler}
                                    >
                                        {colours?.map((item) => <Option value={item.id}>
                                            <div style={{
                                                backgroundColor: item?.color,
                                                height: "15px",
                                                width: "15px",
                                                borderRadius: '100%'
                                            }}></div>
                                        </Option>)}
                                    </Select>
                                </div>
                            </div>

                            <CustomInput
                                onChng={valueChangeHandler}
                                type="number"
                                label="Enter Product Quantity"
                                name="quantity"
                                value={form?.quantity}
                            />
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
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

let productSchema = object({
    title: string('Title is required').required('Title is required'),
    description: string('Description is required').required('Description is required'),
    category: string('Category is required').required('Category is required'),
    brand: string('Brand is required').required('Brand is required'),
    colors: array().required("select at least one colour").typeError("select at least one colour").min(1, 'select at least one colour'),
    quantity: string('Quantity is required').required('Quantity is required'),
});

