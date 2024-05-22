import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from "antd";

import { useToast } from "@chakra-ui/react";
import { createUser, getUserById } from '../../services';
import "./cssAdmin.css"
import { createApiPjc } from '../../../services';
import { DataContext } from '../../../useContextData';
<script src="node_modules/toastr/toastr.js"></script>




const EditUser = (id) => {
  const {userData, setUserData} = useContext(DataContext)

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm()
  const toast = useToast()


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  const getUser = async () => {
    try {
      const user = await createApiPjc().get(`http://localhost:8000/user/${id.id}`);
      console.log(user.data.user)
      form.setFieldValue("username", user.data.username);
      form.setFieldValue("email", user.data.user.email);
      form.setFieldValue("role", user.data.user.role);
      form.setFieldValue("phone", user.data.user.phone);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
   
    console.log(values)
        try {
            const result = await createApiPjc().put(`http://localhost:8000/user/${id.id}`,
            {
              username: values.username,
              email: values.email,
              role: values.role,
              phone: values.phone,
            }
            )

            alert("Tạo người dùng thành công")

            window.location.reload()
            // console.log(result)
        } catch (error) {
            console.log(error)
            alert("Tạo người dùng thất bại")
        }
    }
    useEffect(() => {
        getUser();
      }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue">
        Edit
      </Button>
      <Modal
        title="Edit user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            form="myForm"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            className='bg-blue'
          >
            OK
          </Button>,
        ]}
      >

        <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "small",
      }}
      size="small"
      style={{
        maxWidth: 800,
      }}
      autoComplete="off"
      form={form}
      id="myForm"
      onFinish={onFinish}
    >
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" >
        <Input/>
      </Form.Item>
      <Form.Item label="Role" name="role" >
        <Select>
          <Select.Option value="65465abf81225ec455f35aba">Customer</Select.Option>
          <Select.Option value="65465ae281225ec455f35abc">Admin</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Phone Number" name="phone" >
        <Input/>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};
export default EditUser;