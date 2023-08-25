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
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Address</p>
                        <p className="small text-muted mb-0">{
                            order?.address
                        }</p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Order Details</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Invoice Number : 788152</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> $19.00</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                        <p className="text-muted mb-0"><span
                            className="fw-bold me-4">Delivery Charges</span> Free</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-footer border-0 px-4 py-5">
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                        paid: <span className="h2 mb-0 ms-2">$1040</span></h5>
                </div>
            </div>
        </div>
    )
}

export default Order