import { Table } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { get } from '../service/api.service';
import { PRODUCT_TAGS } from './../const/tag.const';


const Productlist = () => {

    const { isLoading, data } = useQuery([PRODUCT_TAGS.LIST], async()=>get({api:'product'}), {
        staleTime: Infinity
      })

    console.log(data,isLoading,'adadafa');

    
    const columns = [
        {
            title: "SNo",
            dataIndex: "_id",
            render: (text) => (
                <Link to={`/admin/product/${text}`}>{text}</Link>
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            sorter: (a, b) => a.quantity - b.quantity,
            width: 150
        },
        {
            title: "Brand",
            dataIndex: "brand",
            sorter: (a, b) => a.brand - b.brand,
        },
        {
            title: "Category",
            dataIndex: "category",
            sorter: (a, b) => a.category - b.category,
        },
        // {
        //     title: "Color",
        //     dataIndex: "color",
        // },
        {
            title: "Price(LKR)",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            width: 150
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
            <h3 className="mb-4 title">Products</h3>
            <div>
                <Table pagination={false} scroll={{x: 2000, y: 1000}} loading={isLoading} columns={columns}
                       dataSource={data}/>
            </div>
        </div>
    );
};

export default Productlist;
