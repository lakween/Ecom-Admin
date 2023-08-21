import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, filterDocsFromCollectionRT, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


const Customers = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        filterDocsFromCollectionRT('userProfile', '', [['type', '==', 'user']], setDataCallBack).catch(() => {
            setLoading(false)
        })
    }, []);

    const setDataCallBack = (data) => {
        setData(data)
        setLoading(false)
    }

    const columns = [
        {
            title: "Sno",
            dataIndex: "id",
            render: (text) => (
                <Link to={`/admin/customer/${text}`}>{text}</Link>
            ),
        },
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: "Mobile",
            dataIndex: "mobile"
        },
    ];

    return (
        <div>
            <h3 className="mb-4 title">Customers</h3>
            <div>
                <Table pagination={false} scroll={{x: 1500, y: 1000}} loading={loading} columns={columns} rowKey={'id'} dataSource={data}/>
            </div>
        </div>
    );
};

export default Customers;
