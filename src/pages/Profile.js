import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../providers/ContextProvider";
import {Avatar, Card, Space, Typography} from 'antd';
import {UserOutlined, UploadOutlined} from '@ant-design/icons';
import CustomInput from "../Components/CustomInput";
import TextArea from "antd/es/input/TextArea";
import {updateDocOFCollection} from "../actions/CommonAction";
import Loading from "./Loading";
import {toast} from "react-toastify";
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {RcFile} from "antd/es/upload";

const {Title} = Typography;

const {Meta} = Card;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const Profile = () => {
    const {getValue} = useContext(StoreContext)
    let currentUserData = getValue('user')

    const [user, setUser] = useState({})
    const [file, setFile] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setUser(currentUserData)
        console.log(currentUserData,'currentUserData')
        setImageUrl(currentUserData?.photoURL)
    }, [currentUserData]);

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const updateHandler = () => {
        setLoading(true)
        uploadFiles().then((urls) => {
            updateDocOFCollection('userProfile', user?.id, {...user, photoURL: urls[0] ? urls[0] : ''}).then(() => {
                toast.success('Your profile Updated', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).catch(() => {
                toast.error('Failed to update your profile', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).finally(() => {
                setLoading(false)
            })

        }).catch(e => {
            toast.error('Failed to update your profile', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            setLoading(false)
        })

    }

    const props: UploadProps = {
        name: 'file',
        action: false,
        maxCount: 1,
        multiple: false,
        headers: {
            authorization: 'authorization-text',
        },
        onChange({file, fileList}) {
            getBase64(file.originFileObj, (url) => {
                setImageUrl(url);
            });
            setFile(fileList?.map((item) => item?.originFileObj || {}))
        }, onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    console.log(file, 'file')
    const uploadFiles = async () => {
        let fileUrls = []
        if (file.length > 0) {
            for (let fil of file) {
                const storage = getStorage();
                const fileRef = ref(storage, `profile/${Math.floor(Math.random() * 1000) + fil.name}`);
                const snapshot = await uploadBytes(fileRef, fil);
                let fileUrl = await getDownloadURL(fileRef);
                fileUrls.push(fileUrl)
            }
        }
        return fileUrls
    }


    return (
        <div className={'p-10'}>
            <Title level={2}>Update Your Profile</Title>
            <Card
                style={{width: '100%'}}

            >
                <Space wrap size={16}>
                    <Space direction={'vertical'}>
                        <Avatar className={'ms-4'} shape="square" size={100} src={imageUrl} icon={<UserOutlined/>}/>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                        </Upload>
                    </Space>

                    <div className={'d-flex direction-row gap-5 ms-4'}>
                        <Meta title={'Name'} description={user?.firstName || '' + user?.lastName || ''}/>
                        <Meta title={'Email'} description={user?.email}/>
                        <Meta title={'Address'}
                              style={{minWidth: '300px', wordBreak: 'break-all', wordWrap: 'break-word'}}
                              description={user?.address || ''}/>
                        <Meta title={'Mobile'} description={user?.mobile || ''}/>
                    </div>
                </Space>
            </Card>

            {loading ? <Loading/> : (<div>
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
                            <TextArea className={'form-control'} placeholder={'Address'} onChange={valueChangeHandler}
                                      name={"address"} value={user?.address} rows={6}/>
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
                <button
                    onClick={updateHandler}
                    className="btn btn-success border-0 rounded-3 my-5"
                >
                    Update
                </button>
            </div>)
            }
        </div>

    )
}

export default Profile