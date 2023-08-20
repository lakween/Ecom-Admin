import {Spin} from "antd";
import React from "react";

const Loading = ()=>{
    return (
        <div className="d-flex justify-content-center align-items-center " style={{minHeight: '70vh'}}><Spin
            style={{minHeight: '100%', width: '100%'}}/></div>
    )
}

export default Loading