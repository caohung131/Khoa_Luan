import React, { useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';




const onClick = ({ key }) => {
  // const navigate = new useNavigate();

  localStorage.removeItem("user/admin");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  window.location.assign("http://localhost:3000")

  // handleClick();
};

const User = JSON?.parse(localStorage?.getItem("user"))

try {
} catch (error) {
  
}

const items = [
  {
    label: 'Đăng xuất',
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
        {/* {User?.email} */}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default AdminName;