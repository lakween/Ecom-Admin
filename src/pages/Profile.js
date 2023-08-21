import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../providers/ContextProvider";
import React from 'react';
import {Card} from 'antd';
import {Typography} from 'antd';

const {Title} = Typography;

const {Meta} = Card;
const Profile = () => {
    const {getValue} = useContext(StoreContext)
    let currentUserData = getValue('user')

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(currentUserData)
    }, [currentUserData]);

    return (
        <div className={'p-10'}>
            <Title level={2}>Update You Profile</Title>
            <Card
                hoverable
                style={{width: '100%'}}

            >
                <Meta title="U" description="www.instagram.com"/>
            </Card>
        </div>

    )
}

export default Profile