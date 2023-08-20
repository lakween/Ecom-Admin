import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const TagList = ()=>{
    const [data, setData] = useState()

    useEffect(() => {
        getAllDocFromCollectionRT('tag', setData)
    }, []);

    const onDeleteHandler = (id) => {
        deleteDocument('tag', id).then(() => {
            toast.success('Tag successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete tag.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
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
                <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default TagList