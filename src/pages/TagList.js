import { Button, Table } from "antd";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORY_TAGS, PRODUCT_TAG_TAGS } from "../const/tag.const";
import { deleteDoc, get } from "../service/api.service";
import React from "react";

const TagList = () => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery([PRODUCT_TAG_TAGS.LIST], async()=>get({api:'tag'}), {
        staleTime: Infinity
      })

      const onDeleteHandler = (id) => {
        deleteDoc({ api: `tag/${id}` }).then(() => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_TAG_TAGS.LIST] })
            toast.success('Tag successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Tags.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    const columns = [
        {
            title: "SNo",
            dataIndex: "_id",
            outerWidth:50,
            render: (text) => (
                <Link to={`/admin/tag/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Tag Name",
            dataIndex: "name",
            innerWidth:50,
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: "Action",
            dataIndex: "_id",
            innerWidth:50,
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
                <Table className="w-full" loading={isLoading} pagination={false} scroll={{x: 1000, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    )
}

export default TagList