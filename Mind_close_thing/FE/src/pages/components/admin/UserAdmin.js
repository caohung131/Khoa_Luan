import { useToast } from "@chakra-ui/react";
import { Button, Popconfirm, Space, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { DataContext } from "../../../useContextData";

const UserAdmin = () => {
  
  const { userData, setUserData } = useContext(DataContext)
  // console.log(userData)

  const [user, setUser] = useState([]);



  useEffect(() => {
    setUser(userData?.user)
  }, [userData])
  
  // console.log(user)
  const toast = useToast();


  const deleteUser = async (id) => {
    try {
      // console.log(userData)
      await createApiPjc().delete(`http://localhost:8000/user/${id}`)
      setUser(user.filter((item) => item._id != id));
      alert("Xóa người dùng thành công")
    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
    }
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      render: (text) => <p>{text?.shippingAddress?.address}</p>,
    },
    {
      title: "Huyện",
      render: (text) => <p>{text?.shippingAddress?.district}</p>,
    }, 
    {
      title: "Thành phố",
      render: (text) => <p>{text?.shippingAddress?.city}</p>,
    },
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth_year",
      key: "birth_year",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  

    
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditUser id={record._id}  />
          <Popconfirm
            title="Bạn có chắc chắn muốn xác nhận không?"
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
              style: { backgroundColor: '#1E90FF', color: 'white' }
            }}
            cancelButtonProps={{
              style: { backgroundColor: '#f0f0f0', color: 'rgba(0, 0, 0, 0.85)' }
            }}
            onConfirm={() => {
              deleteUser(record._id);
            }}
          >
            <Button className="bg-red color-white">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CreateUser />
      <Table columns={columns} dataSource={user} />
    </>
  );
};
export default UserAdmin;
