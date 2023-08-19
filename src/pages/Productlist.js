import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {getAllDocFromCollection, getAllDocFromCollectionRT} from "../actions/CommonAction";


const Productlist = () => {

  const [data,setData] = useState()


  useEffect(() => {
    // getAllDocFromCollection('product').then((data)=>setData(data))
    getAllDocFromCollectionRT('product',()=>{})
  }, []);

  const onDeleteHandler = ()=>{

  }

  const columns = [
    {
      title: "SNo",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title - b.title,
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
      dataIndex: "id",
      render: (text) => (
          <div>
            <Button onClick={()=>(onDeleteHandler(text))} className={'me-2'}>Delete</Button>
            <Button>View Images</Button>
          </div>

      ),
    },
  ];


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
