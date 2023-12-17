import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  deleteDocument,
  getAllDocFromCollection,
  getAllDocFromCollectionRT,
  getDocFromCollection
} from "../actions/CommonAction";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const Enquiries = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllDocFromCollectionRT('enquiries', buildDataForTable)
  }, []);

  const buildDataForTable = async (data) => {
    setData(data)
    setLoading(false)
  }


  const onDeleteHandler = (id) => {
    setLoading(true)
    deleteDocument('enquiries', id).then(() => {
      toast.success('Enquiries successfully deleted', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }).catch(() => {
      toast.error('Failed to delete Enquiries.', {
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
        <Link to={`/admin/product/${text}`}>{text}</Link>
      ),
    },
    {
      title: "Customer",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
      width: 150
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      sorter: (a, b) => a.mobile_number - b.mobile_number,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      sorter: (a, b) => a.comment - b.comment,
      render: (text) => (
        <div>
          {text} 
        </div>
      ),
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
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table pagination={false} scroll={{ x: 2000, y: 1000 }} loading={loading} columns={columns}
          dataSource={data} />
      </div>
    </div>
  );
};

export default Enquiries;
