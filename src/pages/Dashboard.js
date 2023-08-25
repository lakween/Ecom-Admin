import React, {useEffect, useState} from "react";
import {Column} from "@ant-design/plots";
import {Spin, Table} from "antd";
import {
    filterDocsFromCollection,
    getAllDocFromCollection,
    getCountByFilter,
    getCountOfCollection
} from "../actions/CommonAction";

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
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Status",
        dataIndex: "staus",
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        staus: `London, Park Lane no. ${i}`,
    });
}
const Dashboard = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDashboardData()
    }, []);

    const getDashboardData = async () => {
        setLoading(true)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999)

        const totalCustomers = await getCountByFilter('userProfile', [['type', '==', 'user']])
        const totalProducts = await getCountOfCollection('product')
        const totalsalesToday = await getCountByFilter('orders', [['timestamp', '>=', currentDate], ['timestamp', '<=', endOfDay]])
        const totalIncome = (await getAllDocFromCollection('orders'))?.reduce((tot, curr) => (tot + curr.price), 0)
        const totalIncomeToday = (await filterDocsFromCollection('order', '', [
            ['timestamp', '>=', currentDate], ['timestamp', '<=', endOfDay]
        ])).reduce((tot, curr) => (tot + curr.price), 0)
        setLoading(false)

        setData({
            totalCustomers,
            totalProducts,
            totalsalesToday,
            totalIncome,
            totalIncomeToday
        })

    }

    console.log(data, 'data')

    const abc = [
        {
            type: "Jan",
            sales: 38,
        },
        {
            type: "Feb",
            sales: 52,
        },
        {
            type: "Mar",
            sales: 61,
        },
        {
            type: "Apr",
            sales: 145,
        },
        {
            type: "May",
            sales: 48,
        },
        {
            type: "Jun",
            sales: 38,
        },
        {
            type: "July",
            sales: 38,
        },
        {
            type: "Aug",
            sales: 38,
        },
        {
            type: "Sept",
            sales: 38,
        },
        {
            type: "Oct",
            sales: 38,
        },
        {
            type: "Nov",
            sales: 38,
        },
        {
            type: "Dec",
            sales: 38,
        },
    ];
    const config = {
        data: abc,
        xField: "type",
        yField: "sales",
        color: ({type}) => {
            return "#ffd333";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Total Customers</p>
                        {loading ? <h4 className="mb-0 sub-title"><Spin size="small"/></h4> :
                            <h4 className="mb-0 sub-title">{data?.totalCustomers}</h4>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Total Products</p>

                        {loading ? <h4 className="mb-0 sub-title"><Spin size="small"/></h4> :
                            <h4 className="mb-0 sub-title">{data?.totalProducts}</h4>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Total Sales Today</p>
                        {loading ? <h4 className="mb-0 sub-title"><Spin size="small"/></h4> :
                            <h4 className="mb-0 sub-title">{data?.totalsalesToday || 0.00}</h4>
                        }

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Total Income</p>
                        {loading ? <h4 className="mb-0 sub-title"><Spin size="small"/></h4> :
                            <h4 className="mb-0 sub-title">{data?.totalIncome?.toFixed(2) || 0.00} LKR</h4>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Total Income Today</p>
                        {loading ? <h4 className="mb-0 sub-title"><Spin size="small"/></h4> :
                            <h4 className="mb-0 sub-title">{data?.totalIncomeToday?.toFixed(2) || 0.00} LKR</h4>
                        }
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Income Statics</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Recent Orders</h3>
                <div>
                    <Table columns={columns} dataSource={data1}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
