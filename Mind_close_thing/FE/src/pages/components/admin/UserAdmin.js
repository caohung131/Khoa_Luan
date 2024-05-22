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
  
  console.log(user)
  const toast = useToast();


  const deleteUser = async (id) => {
    try {
      // console.log(userData)
      await createApiPjc().delete(`http://localhost:8000/user/${id}`)
      // toast({
      //   status: "success",
      //   title: "Xoá người dùng thành công",
      //   position: "top",
      // });
      setUser(user.filter((item) => item._id != id));
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
      title: "Address",
      render: (text) => <p>{text?.shippingAddress?.address}</p>,
    },
    {
      title: "district",
      render: (text) => <p>{text?.shippingAddress?.district}</p>,
    }, 
    {
      title: "city",
      render: (text) => <p>{text?.shippingAddress?.city}</p>,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Birthday",
      dataIndex: "birth_year",
      key: "birth_year",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
  

    
    {
      title: "Action",
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
            <Button className="bg-red color-white">Delete</Button>
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
