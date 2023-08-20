import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {
    deleteDocument,
    getAllDocFromCollection,
    getAllDocFromCollectionRT,
    getDocFromCollection
} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link, useParams} from "react-router-dom";


const Productlist = () => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllDocFromCollectionRT('product', buildDataForTable)
    }, []);

    const buildDataForTable = async (data) => {
        let array = []
        for (let row of data) {
            let brandDoc = {}
            let categoryDoc = {}
            try {
                if (row?.brand) brandDoc = await getDocFromCollection('brand', row?.brand)
                if (row?.category) categoryDoc = await getDocFromCollection('category', row?.category)
                array.push({...row, brand: brandDoc?.name || '', category: categoryDoc?.name || ''})

            } catch (e) {
                console.log(e)
            }

        }
        setData(array)
        setLoading(false)
    }


    const onDeleteHandler = (id) => {
        setLoading(true)
        deleteDocument('product', id).then(() => {
            toast.success('Product successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Product.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).finally(() => {
            setLoading(false)
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
            title: "Price(LKR)",
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
                <Table pagination={false} scroll={{x: 1500, y: 1000}} loading={loading} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Productlist;
