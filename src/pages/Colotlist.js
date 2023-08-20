import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";

const Colorlist = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllDocFromCollectionRT('color', setData).finally(() => {
            setLoading(false)
        })
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
                <div style={{backgroundColor: color, height: '20px', width: '20px', borderRadius: '100%'}}>
                </div>
            )
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <div>
                    <Button onClick={() => (onDeleteHandler(id))} className={'me-2'}>Delete</Button>
                </div>

            ),
        },
    ];

    const onDeleteHandler = (id) => {
        setLoading(true)
        deleteDocument('color', id).then(() => {
            toast.success('Color successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete color.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table loading={loading} pagination={false} scroll={{x: 1500, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Colorlist;
