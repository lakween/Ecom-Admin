import React, {useEffect, useState} from "react";
import {Column} from "@ant-design/plots";
import {Spin, Table} from "antd";
import {
    filterDocsFromCollection,
    getAllDocFromCollection,
    getChartData,
    getCountByFilter,
    getCountOfCollection
} from "../actions/CommonAction";
import Loading from "./Loading";
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
            const milliseconds = text.nanoseconds / 1000000;
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
    const [chartData, setChartData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChart, setLoadingChart] = useState(false)
    const [todayOrders, setTodayOrders] = useState([])

    useEffect(() => {
        getDashboardData()
        getChartData(setChartData, setLoadingChart)
        getTodayOrders()
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

    const getTodayOrders = async () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999)

        const todayOrders = await filterDocsFromCollection('orders', '',[['timestamp', '>=', currentDate], ['timestamp', '<=', endOfDay]])
        setTodayOrders(todayOrders)
    }

    const config = {
        data: chartData,
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
                    {
                        loadingChart ? <Loading/> : <Column {...config} />
                    }

                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Today Orders</h3>
                <div>
                    <Table columns={columns} dataSource={todayOrders}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
