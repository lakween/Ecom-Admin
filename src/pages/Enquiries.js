import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

];

const data1 = [];
const generateData = (i) => ({
  key: i,
  name: 'John Blame ${i}',
  product: 32,
  status: 'London, Park Lane No. ${i}',
});

for (let i = 0; i < 46; i++) {
  data1.push(generateData(i));
}

  const Enquiries = () => {
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
