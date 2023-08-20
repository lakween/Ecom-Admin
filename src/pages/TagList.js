import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const TagList = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllDocFromCollectionRT('tag', setData).finally(() => {
            setLoading(false)
        })
    }, []);

    const onDeleteHandler = (id) => {
        setLoading(true)
        deleteDocument('tag', id).then(() => {
            toast.success('Tag successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete tag.', {
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
                <Link to={`/admin/tag/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Tag Name",
            dataIndex: "name",
            sorter: (a, b) => a.title - b.title,
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
            <h3 className="mb-4 title">Tags</h3>
            <div>
                <Table loading={loading} pagination={false} scroll={{x: 1500, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    )
}

export default TagList