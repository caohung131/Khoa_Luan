import React, { useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import {UserProvider } from "../../../UserContext"

const {user} = UserProvider;
 
console.log(user)


const handleClick = () => {
  const navigate = new useNavigate();
  // localStorage.removeItem("user/admin");
  // localStorage.removeItem("user/user");
  navigate("/");
}

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
  const navigate = new useNavigate();

  // handleClick();
  navigate("/2");
};

const items = [
  {
    label: 'Log Out',
    key: '1',
  }
];

const AdminName = () => (
  <Dropdown
    menu={{
      items,
      onClick,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Username
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default AdminName;