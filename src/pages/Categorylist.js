import { Button, Table } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDoc, get } from '../service/api.service';
import { CATEGORY_TAGS } from './../const/tag.const';

const Categorylist = () => {

    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery([CATEGORY_TAGS.LIST], async()=>get({api:'category'}), {
        staleTime: Infinity
      })

      const onDeleteHandler = (id) => {
        deleteDoc({ api: `category/${id}` }).then(() => {
            queryClient.invalidateQueries({ queryKey: [CATEGORY_TAGS.LIST] })
            toast.success('Category successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Category.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }



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

        {
            title: "Action",
            dataIndex: "_id",
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
                <Table loading={loading} pagination={false} scroll={{x: 1000, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Categorylist;
