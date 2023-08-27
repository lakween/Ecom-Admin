import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getDocFromCollection} from "../actions/CommonAction";
import {Select, Table} from "antd";

const {Option} = Select

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
        render: (text) => (
            <div>
                {text?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })} LKR
            </div>
        ),
    },
];
const Order = () => {
    let {id} = useParams()
    const [order, setOrder] = useState()

    console.log(order, 'order')

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

                    <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Order Number</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{id}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Total</p>
                        <p className="text-muted mb-0"><span
                            className="fw-bold me-4"></span>{order?.price.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} LKR</p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">Status</p>
                        <p className="text-muted mb-0"><span
                            className="fw-bold me-4"></span> {order?.payStatus}</p>
                    </div>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body p-4 mt-5">
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
                        <p className="text-muted mb-0">Shipping Status</p>
                        <div>
                            <Select
                                style={{width: '200px'}}
                                value={order?.shippingStatus}
                                allowClear
                                name={"shippingStatus"}
                                id={'shippingStatus'}
                                className="ms-2 min-w-[200px]"
                                placeholder="Shipping Status"
                                onChange={(e, {key, value}) => {
                                    setOrder({...order, shippingStatus: value})
                                }}
                            >
                                <Option key={'Shipped'} value={'Shipped'}>
                                    Shipped
                                </Option>
                                <Option key={'Shipped'} value={'Shipped'}>
                                    Pending
                                </Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body p-4 mt-5">
                    <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Customer Details</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span></p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Address</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.address}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">First name</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.firstName}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Last Name</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.lastName} </p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">email</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4"></span>{order?.email} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order