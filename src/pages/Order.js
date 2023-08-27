import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getDocFromCollection, updateDocOFCollection, updateOnlyFieldDocOFCollection} from "../actions/CommonAction";
import {Select, Spin, Table} from "antd";
import {toast} from "react-toastify";

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
                {text ? text?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }) : '0.00'} LKR
            </div>
        ),
    },
];
const Order = () => {
    let {id} = useParams()
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(false)

    console.log(order, 'order')

    useEffect(() => {
        if (id) getOrder()
    }, [id]);

    const getOrder = () => {
        setLoading(true)
        getDocFromCollection('orders', id).then((data) => {
            if (data) setOrder(data)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const updateOrder = () => {
        setLoading(true)
        updateOnlyFieldDocOFCollection('orders', id, {shippingStatus: order?.shippingStatus}).then(() => {
            toast.success('Updated', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).then(() => {
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    return (
        <div className="py-5 h-100">
            <h3 className="mb-4 title">View Order</h3>
            {
                loading ?
                    <div className="d-flex justify-content-center align-items-center " style={{minHeight: '70vh'}}><Spin
                        style={{minHeight: '100%', width: '100%'}}/></div> :
                    (
                        <>
                            <div className="card mb-3">
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
                                            className="fw-bold me-4"></span>{order?.price?.toLocaleString('en-US', {
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
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.address}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Zipcode</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.zipCode}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">City</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.city} </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">District</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.district} </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Province</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.province} </p>
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
                                                <Option key={'Pending'} value={'Pending'}>
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
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.address}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">First name</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.firstName}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Last Name</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.lastName} </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">email</p>
                                        <p className="text-muted mb-0"><span
                                            className="fw-bold me-4"></span>{order?.email} </p>
                                    </div>
                                </div>
                                <button
                                    onClick={updateOrder}
                                    className="btn btn-success border-0 rounded-3 my-5"
                                >
                                    Update Order
                                </button>
                            </div>
                        </>
                    )
            }

        </div>
    )
}

export default Order