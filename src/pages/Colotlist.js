import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";

const Colorlist = () => {
    const [data, setData] = useState()

    useEffect(() => {
        getAllDocFromCollectionRT('color', setData)
    }, []);

    const columns = [
        {
            title: "SNo",
            dataIndex: "id",
        },
        {
            title: "Color",
            dataIndex: "color",
            render: (color) => (
                <div style={{backgroundColor:color,height:'20px',width:'20px',borderRadius:'100%'}}>
                </div>
            )
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <div>
                    <Button onClick={()=>(onDeleteHandler(id))} className={'me-2'}>Delete</Button>
                </div>

            ),
        },
    ];

    const onDeleteHandler = (id) => {
        deleteDocument('color', id).then(() => {
            toast.success('Color successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete color.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }
    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    );
};

export default Colorlist;
