import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../providers/ContextProvider";
import {Button, Card, Form, FormInstance, Typography} from 'antd';
import CustomInput from "../Components/CustomInput";
import TextArea from "antd/es/input/TextArea";

const {Title} = Typography;

const {Meta} = Card;
const Profile = () => {
    const {getValue} = useContext(StoreContext)
    let currentUserData = getValue('user')

    console.log(currentUserData)

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(currentUserData)
    }, [currentUserData]);

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setUser({...user, [name]: value})
    }


    return (
        <div className={'p-10'}>
            <Title level={2}>Update You Profile</Title>
            <Card
                hoverable
                style={{width: '100%'}}

            >
                <div className={'d-flex direction-row gap-5'}>
                    <Meta title={'Name'} description={user?.firstName || '' + user?.lastName || ''} />
                    <Meta title={'Email'} description={user?.email}/>
                    <Meta title={'Address'} description={user?.address || ''}/>
                    <Meta title={'Mobile'} description={user?.mobile || ''}/>
                </div>

            </Card>


            <div className="row">
                <div className="col">
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="text"
                        i_class={''}
                        value={user?.firstName}
                        name="firstName"
                        label="First Name"
                        id="blogcat"
                    />
                </div>
                <div className="col">
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="text"
                        value={user?.lastName}
                        name="lastName"
                        label="Last Name"
                        id="blogcat"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-floating mt-3">
                    <TextArea className={'form-control'} placeholder={'Address'} onChange={valueChangeHandler} name={"address"} value={user?.address} rows={4}/>
                        <label htmlFor={'Address'}>Address</label>
                    </div>
                </div>
                <div className="col">
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="number"
                        value={user?.mobile}
                        name="mobile"
                        label="Mobile"
                    />
                </div>
            </div>
        </div>

    )
}

const SubmitButton = ({
                          form
                      }: {
    form: FormInstance
}) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({validateOnly: true}).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};

export default Profile