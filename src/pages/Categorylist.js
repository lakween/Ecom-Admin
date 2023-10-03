import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import { get } from '../service/api.service';
import {Link} from "react-router-dom";
import { CATEGORY_TAGS, PRODUCT_TAGS } from './../const/tag.const';
import { useQuery } from 'react-query';

const Categorylist = () => {

    // const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const { isLoading, data } = useQuery([CATEGORY_TAGS.LIST], async()=>get({api:'category'}), {
        staleTime: Infinity
      })

    console.log(data,'dsta')

    // useEffect(() => {
    //     setLoading(true)
    //     getAllDocFromCollectionRT('category', setData).finally(() => {
    //         setLoading(false)
    //     })
    // }, []);

    // const onDeleteHandler = (id) => {
    //     setLoading(true)
    //     deleteDocument('category', id).then(() => {
    //         toast.success('category successfully deleted', {
    //             position: toast.POSITION.BOTTOM_CENTER
    //         });
    //     }).catch(() => {
    //         toast.error('Failed to delete category.', {
    //             position: toast.POSITION.BOTTOM_CENTER
    //         });
    //     }).finally(() => {
    //         setLoading(false)
    //     })
    // }

    const columns = [
        {
            title: "CNo",
            dataIndex: "_id",
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

        // {
        //     title: "Action",
        //     dataIndex: "id",
        //     render: (text) => (
        //         <div>
        //             <Button onClick={() => (onDeleteHandler(text))} className={'me-2'}>Delete</Button>
        //         </div>

        //     ),
        // },
    ];

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table loading={loading} pagination={false} scroll={{x: 1500, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Categorylist;
