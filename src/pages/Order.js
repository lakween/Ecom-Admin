import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getDocFromCollection} from "../actions/CommonAction";
import {Table} from "antd";

const columns = [
    {
        title: "Item Id",
        dataIndex: "id",
    },
    {
        title: "Item Name",
        dataIndex: "name",
    },
    {
        title: "Size",
        dataIndex: "size",
        render: (text) => (
            <div>
                {text[0] ? text[0] : ''}
            </div>
        ),
    },
    {
        title: "Quantity",
        dataIndex: "qty",
    },
    {
        title: "Rate",
        dataIndex: "rate",
    },
    {
        title: "Total",
        dataIndex: "price",
    },
];
const Order = () => {
    let {id} = useParams()
    const [order, setOrder] = useState()

    console.log(order,'order')

    useEffect(() => {
        if (id) getOrder()
    }, [id]);

    const getOrder = () => {
        getDocFromCollection('orders', id).then((data) => {
            if (data) setOrder(data)
        }).catch((e) => {

        })
    }

    return (
        <div className="py-5 h-100">
            <div className="card mb-3">
                {/*<div className="card-header px-4 py-5">*/}
                {/*    <h5 className="text-muted mb-0">Thanks for your Order, <span*/}
                {/*    >{order?.firstName + ' ' + order?.lastName}</span>!</h5>*/}
                {/*</div>*/}
            </div>
            <div className={'mb-3'}>
                <Table pagination={false} scroll={{x: 2000, y: 1000}} columns={columns}
                       dataSource={order?.cartItems || []}/>
            </div>
            <div className="card">
                <div className="card-body p-4 mt-5">
                    {/*<div className="d-flex justify-content-between align-items-center mb-4">*/}
                    {/*    <p className="lead fw-normal mb-0">Address</p>*/}
                    {/*    <p className="small text-muted mb-0">{*/}
                    {/*        order?.address*/}
                    {/*    }</p>*/}
                    {/*</div>*/}

                    <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Order Details</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Order Number</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{id}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Total</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.price} LKR</p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">status</p>
                        <p className="text-muted mb-0"><span
                            className="fw-bold me-4"></span> {order?.payStatus}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body p-4 mt-5">
                    {/*<div className="d-flex justify-content-between align-items-center mb-4">*/}
                    {/*    <p className="lead fw-normal mb-0">Address</p>*/}
                    {/*    <p className="small text-muted mb-0">{*/}
                    {/*        order?.address*/}
                    {/*    }</p>*/}
                    {/*</div>*/}

                    <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Shipping Details</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span></p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Address</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.address}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Zipcode</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.zipCode}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">City</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.city} </p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">District</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.district} </p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Province</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.province} </p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">status</p>
                        <p className="text-muted mb-0"><span
                            className="fw-bold me-4"></span> {order?.payStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order