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
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
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

const Categorylist = () => {
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
