import React, { useState } from "react";
import "./Admin.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Avatar,
  Dropdown,
  Space,
  Flex,
} from "antd";
import UserAdmin from "../components/admin/UserAdmin";
import ProductAdmin from "../components/admin/ProductAdmin";
import Dashboard from "../components/admin/Dashboard";
import OrderAdmin from "../components/admin/OrderAdmin";
import HeaderAdmin from "../components/admin/AdminName";
import AdminName from "../components/admin/AdminName";
import Category from "../components/admin/Category";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Thống kê", "1", <DesktopOutlined />),
  getItem("Đơn hàng", "2", <ShoppingCartOutlined />),
  getItem("Sản phẩm", "3", <DatabaseOutlined />),
  getItem("Người dùng", "4", <UserOutlined />),
  getItem("Danh mục", "5", <UserOutlined />),
];
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selection, setSelection] = useState(1);
  // console.log(selection);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-vertical">Mind Clothing Store</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          onClick={(item) => {
            setSelection(item.key);
          }}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: Flex,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <div>
              <Avatar
                style={{ marginRight: "12px" }}
                size="large"
                icon={<UserOutlined />}
              />
            </div>
            <AdminName />
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* // trả về selection của admin */}
            {selection == 1 ? <Dashboard /> : null}
            {selection == 2 ? <OrderAdmin /> : null}
            {selection == 3 ? <ProductAdmin /> : null}
            {selection == 4 ? <UserAdmin /> : null}
            {selection == 5 ? <Category /> : null}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Mind Clothing Store
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
