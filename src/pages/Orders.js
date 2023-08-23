import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {getAllDocFromCollection} from "../actions/CommonAction";
import {Link} from "react-router-dom";

const columns = [
    {
        title: "id",
        dataIndex: "id",
        render: (text) => (
            <Link to={`/admin/order/${text}`}>{text}</Link>
        ),
    },
    {
        title: "User ID",
        dataIndex: "userID",
    },
    {
        title: "First Name",
        dataIndex: "firstName",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Date",
        dataIndex: "timestamp",
        render: (text) => {
            const seconds = text.seconds;
            const milliseconds = text.nanoseconds / 1000000; // Convert nanoseconds to milliseconds
            const timestampInMillis = seconds * 1000 + milliseconds;
            const date = new Date(timestampInMillis);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');

            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(hours % 12 || 12).padStart(2, '0');

            const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;

            return (
                <div>
                    {formattedDate}
                </div>
            )
        },
    },
    {
        title: "Total",
        dataIndex: "price",
        render: (text) => (
            <div>
                {text + ' ' + 'LKR'}
            </div>
        )
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

const Orders = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getAllDocFromCollection('orders').then((data) => {
            console.log(data, 'data')
            setData(data)
        })
    }, []);

    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div>{<Table columns={columns} dataSource={data}/>}</div>
        </div>
    );
};

export default Orders;
