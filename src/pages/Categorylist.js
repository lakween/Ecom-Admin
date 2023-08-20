import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const Categorylist = () => {

    const [data, setData] = useState()


    useEffect(() => {
        getAllDocFromCollectionRT('category', setData)
    }, []);

    const onDeleteHandler = (id) => {
        deleteDocument('category', id).then(() => {
            toast.success('category successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete category.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    const columns = [
        {
            title: "CNo",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (text) => (
                <Link to={`/admin/category/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Title",
            dataIndex: "name",
            sorter: (a, b) => a.name - b.name,
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
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table pagination={false} scroll={{x: 1500, y: 1000}} columns={columns} dataSource={data}/>
            </div>
        </div>
    );
};

export default Categorylist;
