import {
    LaptopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar } from 'antd';
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart, AiOutlineTag, AiOutlineBgColors } from 'react-icons/ai'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaClipboardList } from 'react-icons/fa'
import { TbBrandZhihu } from 'react-icons/tb'
import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "../actions/CommonAction";
import { StoreContext } from "../providers/ContextProvider";
import logoNew from "../images/logoNew.png"

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { getValue } = useContext(StoreContext)
    let user = getValue('user')

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );

    return (
        <Layout>
            <Sider style={{ backgroundColor: '#e4e4f5' }} trigger={null} collapsible collapsed={collapsed}>
                <div className='flex justify-center items-center w-full'>
                    <img style={{ backgroundColor: "#e4e4f5", width: '150px', height: '100px' }} src={logoNew} />

                </div>
                <Menu
                    style={{ backgroundColor: '#e4e4f5' }}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        if (key == "signout") {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-4" />,
                            label: "Customers",
                        },
                        {
                            key: "Catalog",
                            icon: <AiOutlineShoppingCart className="fs-4" />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: <AiOutlineShoppingCart className="fs-4" />,
                                    label: "Add Product",
                                },
                                {
                                    key: "list-product",
                                    icon: <AiOutlineShoppingCart className="fs-4" />,
                                    label: "Product List",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Category",
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Category List",
                                },
                                {
                                    key: "tag",
                                    icon: <AiOutlineTag className="fs-4" />,
                                    label: "Add Tag",
                                },
                                {
                                    key: "list-tag",
                                    icon: <AiOutlineTag className="fs-4" />,
                                    label: "Tag List",
                                },
                                {
                                    key: "brand",
                                    icon: <TbBrandZhihu className="fs-4" />,
                                    label: "Add Brand",
                                },
                                {
                                    key: "list-brand",
                                    icon: <TbBrandZhihu className="fs-4" />,
                                    label: "Brand List",
                                },
                                {
                                    key: "color",
                                    icon: <AiOutlineBgColors className="fs-4" />,
                                    label: "Color",
                                },
                                {
                                    key: "list-color",
                                    icon: <AiOutlineBgColors className="fs-4" />,
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-4" />,
                            label: "Orders",
                        },

                    ]}
                />
            </Sider>
            <Layout>
                <Header className=' bg-slate-50 px-0 !border-slate-200  !z-[10000]'  >
                    <div className="flex justify-between  bg-slate-50 px-0 !border-slate-200 !border-b-[1px] items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}

                        />

                        <div className="d-flex gap-3 align-items-center px-5 dropdown">
                            <div>
                                {
                                    user?.photoURL ?
                                        <Avatar className={'ms-4'} shape="square" src={user?.photoURL} size={35}
                                            icon={<UserOutlined />} /> :
                                        <Avatar className={'ms-4'} shape="square" size={35} icon={<UserOutlined />} />
                                }

                            </div>
                            <div
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <h5 className="mb-0">{user?.firstName || '' + user?.lastName || ''}</h5>
                                <p className="mb-0">{user?.email || ''}</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{ height: "auto", lineHeight: "20px" }}
                                        to="/admin/profile"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{ height: "auto", lineHeight: "20px" }}
                                        onClick={() => {
                                            signOut(navigate)
                                        }}
                                    >
                                        Signout
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    className=' !bg-white !p-5'
                >
                    <Outlet />
                </Content>
                <Footer className=' bg-slate-50 px-0 border-t-2' style={{ textAlign: 'center' }}>Swingtech ©2023 Created by Swingtech</Footer>
            </Layout>
        </Layout>
    );

    // return (
    //     <Layout>
    //         <Sider width={500} trigger={null} collapsible collapsed={collapsed}>
    //             <Header style={{ display: 'flex', alignItems: 'center' }}>
    //                 <div className="demo-logo" />
    //             </Header>
    //             <Menu colorBgContainer
    //                 mode="inline"
    //                 defaultSelectedKeys={[""]}
    //                 onClick={({ key }) => {
    //                     if (key == "signout") {
    //                     } else {
    //                         navigate(key);
    //                     }
    //                 }}
    //                 items={[
    //                     {
    //                         key: "",
    //                         icon: <AiOutlineDashboard className="fs-4" />,
    //                         label: "Dashboard",
    //                     },
    //                     {
    //                         key: "customers",
    //                         icon: <AiOutlineUser className="fs-4" />,
    //                         label: "Customers",
    //                     },
    //                     {
    //                         key: "Catalog",
    //                         icon: <AiOutlineShoppingCart className="fs-4" />,
    //                         label: "Catalog",
    //                         children: [
    //                             {
    //                                 key: "product",
    //                                 icon: <AiOutlineShoppingCart className="fs-4" />,
    //                                 label: "Add Product",
    //                             },
    //                             {
    //                                 key: "list-product",
    //                                 icon: <AiOutlineShoppingCart className="fs-4" />,
    //                                 label: "Product List",
    //                             },
    //                             {
    //                                 key: "category",
    //                                 icon: <BiCategoryAlt className="fs-4" />,
    //                                 label: "Category",
    //                             },
    //                             {
    //                                 key: "list-category",
    //                                 icon: <BiCategoryAlt className="fs-4" />,
    //                                 label: "Category List",
    //                             },
    //                             {
    //                                 key: "tag",
    //                                 icon: <AiOutlineTag className="fs-4" />,
    //                                 label: "Add Tag",
    //                             },
    //                             {
    //                                 key: "list-tag",
    //                                 icon: <AiOutlineTag className="fs-4" />,
    //                                 label: "Tag List",
    //                             },
    //                             {
    //                                 key: "brand",
    //                                 icon: <TbBrandZhihu className="fs-4" />,
    //                                 label: "Add Brand",
    //                             },
    //                             {
    //                                 key: "list-brand",
    //                                 icon: <TbBrandZhihu className="fs-4" />,
    //                                 label: "Brand List",
    //                             },
    //                             {
    //                                 key: "color",
    //                                 icon: <AiOutlineBgColors className="fs-4" />,
    //                                 label: "Color",
    //                             },
    //                             {
    //                                 key: "list-color",
    //                                 icon: <AiOutlineBgColors className="fs-4" />,
    //                                 label: "Color List",
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         key: "orders",
    //                         icon: <FaClipboardList className="fs-4" />,
    //                         label: "Orders",
    //                     },

    //                 ]}
    //             />
    //         </Sider>
    //         <Layout className="site-layout">
    //             <Header
    //                 className="d-flex justify-content-between ps-1 pe-5"
    //                 style={{
    //                     padding: 0,
    //                     background: colorBgContainer,
    //                 }}
    //             >
    //                 {React.createElement(
    //                     collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    //                     {
    //                         className: "trigger",
    //                         onClick: () => setCollapsed(!collapsed),
    //                     }
    //                 )}
    //                 <div className="d-flex gap-4 align-items-center">
    //                     <div className="position-relative">
    //                         <IoIosNotifications className="fs-4" />
    //                         <span className="badge bg-warning rounded-circle p-1 position-absolute">
    //                             3
    //                         </span>
    //                     </div>

    //                     <div className="d-flex gap-3 align-items-center dropdown">
    //                         <div>
    //                             {
    //                                 user?.photoURL ?
    //                                     <Avatar className={'ms-4'} shape="square" src={user?.photoURL} size={35}
    //                                         icon={<UserOutlined />} /> :
    //                                     <Avatar className={'ms-4'} shape="square" size={35} icon={<UserOutlined />} />
    //                             }

    //                             {/*<img*/}
    //                             {/*    width={32}*/}
    //                             {/*    height={32}*/}
    //                             {/*    src=""*/}
    //                             {/*    alt=""*/}
    //                             {/*/>*/}
    //                         </div>
    //                         <div
    //                             role="button"
    //                             id="dropdownMenuLink"
    //                             data-bs-toggle="dropdown"
    //                             aria-expanded="false"
    //                         >
    //                             <h5 className="mb-0">{user?.firstName || '' + user?.lastName || ''}</h5>
    //                             <p className="mb-0">{user?.email || ''}</p>
    //                         </div>
    //                         <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //                             <li>
    //                                 <Link
    //                                     className="dropdown-item py-1 mb-1"
    //                                     style={{ height: "auto", lineHeight: "20px" }}
    //                                     to="/admin/profile"
    //                                 >
    //                                     View Profile
    //                                 </Link>
    //                             </li>
    //                             <li>
    //                                 <Link
    //                                     className="dropdown-item py-1 mb-1"
    //                                     style={{ height: "auto", lineHeight: "20px" }}
    //                                     onClick={() => {
    //                                         signOut(navigate)
    //                                     }}
    //                                 >
    //                                     Signout
    //                                 </Link>
    //                             </li>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Header>
    //             <Content
    //                 style={{
    //                     margin: "24px 16px",
    //                     padding: 24,
    //                     minHeight: 280,
    //                     background: colorBgContainer,
    //                 }}
    //             >

    //                 <Outlet />
    //             </Content>
    //         </Layout>
    //     </Layout>
    // );
};
export default MainLayout;
