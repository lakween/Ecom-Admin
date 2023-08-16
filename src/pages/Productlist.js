import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {getAllDocFromCollection} from "../actions/CommonAction";

const columns = [
  {
    title: "SNo",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (text) => (
        <div className={''}>
          <Button>Delete</Button>
          <Button>View Images</Button>
        </div>

    ),
  },
];

const data1 = [];

const Productlist = () => {

  const [data,setData] = useState()


  useEffect(() => {
    getAllDocFromCollection('product').then((data)=>setData(data))
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Productlist;
