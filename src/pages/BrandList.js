import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import { BRAND_TAGS } from './../const/tag.const';
import { get } from '../service/api.service';
import { useQuery } from 'react-query';

const BrandList = () => {
    const { isLoading, data } = useQuery([BRAND_TAGS.LIST], async()=>get({api:'brand'}), {
        staleTime: Infinity
      })

    const onDeleteHandler = (id) => {
       
        deleteDocument('brand', id).then(() => {
            toast.success('Brand successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Brand.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).finally(() => {
           
        })
    }

    const columns = [
        {
            title: "SNo",
            dataIndex: "_id",
            render: (text) => (
                <Link to={`/admin/brand/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Brand",
            dataIndex: "name",
            sorter: (a, b) => a.brand - b.brand,
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
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table loading={isLoading} pagination={false} scroll={{x: 1500, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    )
}

export default BrandList