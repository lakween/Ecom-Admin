import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {deleteDocument, getAllDocFromCollectionRT} from "../actions/CommonAction";
import {toast} from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { deleteDoc } from "firebase/firestore";
import { CATEGORY_TAGS, COLOUR_TAG_LIST } from "../const/tag.const";
import { get } from "../service/api.service";

const Colorlist = () => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery([COLOUR_TAG_LIST.LIST], async()=>get({api:'color'}), {
        staleTime: Infinity
      })

      const onDeleteHandler = (id) => {
        deleteDoc({ api: `color/${id}` }).then(() => {
            queryClient.invalidateQueries({ queryKey: [COLOUR_TAG_LIST.LIST] })
            toast.success('Colour successfully deleted', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(() => {
            toast.error('Failed to delete Colour.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }


    const columns = [
        {
            title: "SNo",
            dataIndex: "_id",
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
            dataIndex: "_id",
            render: (id) => (
                <div>
                    <Button onClick={() => (onDeleteHandler(id))} className={'me-2'}>Delete</Button>
                </div>

            ),
        },
    ];

    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table loading={loading} pagination={false} scroll={{x: 1000, y: 1000}} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Colorlist;
