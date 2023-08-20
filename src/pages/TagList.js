import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const TagList = ()=>{
    const [data, setData] = useState()

    useEffect(() => {
        getAllDocFromCollectionRT('product', setData)
    }, []);

    const onDeleteHandler = (id) => {
        deleteDocument('product', id).then(() => {
            toast.success('Product successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Product.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    const columns = [
        {
            title: "SNo",
            dataIndex: "id",
            render: (text) => (
                <Link to={`/admin/product/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            sorter: (a, b) => a.brand - b.brand,
        },
        {
            title: "Category",
            dataIndex: "category",
            sorter: (a, b) => a.category - b.category,
        },
        // {
        //     title: "Color",
        //     dataIndex: "color",
        // },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (text) => (
                <div>
                    <Button onClick={() => (onDeleteHandler(text))} className={'me-2'}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h3 className="mb-4 title">Products</h3>
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default TagList