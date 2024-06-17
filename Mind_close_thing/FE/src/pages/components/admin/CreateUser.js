import React, { useState } from 'react';
import {
  Button, Modal, Form,
  Input,
  InputNumber, Select,
} from 'antd';
import { useToast } from "@chakra-ui/react";
import { createProduct, createUser } from '../../services';
import "./cssAdmin.css"
import { createApiPjc } from '../../../services';
import Password from 'antd/es/input/Password';
import axios from 'axios';



const CreateUser = () => {
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
    onFinish()
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = async (values) => {
    // console.log(values);
     try {

      // Kiểm tra định dạng mật khẩu Abc1@ >8 kí tự
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(values.password)) {
        alert(
          "Mật khẩu không đủ mạnh! Mật khẩu cần chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt."
        );
        return;
      }

      const user = await axios.get("http://localhost:8000/user");

      // console.log(user.data.user)

      // Kiểm tra xem email đã tồn tại
      const existingUser = user.data.user.find(
        (user) => user.email == values.email
      );
      if (existingUser) {
        alert("Tài khoản Email đã tồn tại!");
        return;
      }

      // Call api
      const response = await createApiPjc().post(`http://localhost:8000/user/register`, {
        username: values.username,
        email: values.email,
        role: values.role,
        password: values.password,
        phone: values.phone,
        birth_year: values.birth_year,
        shippingAddress: {
          address: values.address,
          district: values.district,
          city: values.city,
        }
      })
      // .then((response) => alert(response.data.message));
      // setUser(user.filter((item) => item));

      alert("Tạo người dùng thành công");
      window.location.reload();
    } catch (error) {
      console.log(error)
      alert("Tạo người dùng thất bại")
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-blue'>
        Tạo 1 người dùng mới
      </Button>
      <Modal
        title="Tạo người dùng"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            form="myForm"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            className='bg-blue'
          >
            Xác nhận
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
          <Form.Item label="Tên" name="username" rules={[{ required: true, message: "Vui lòng điền username" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng điền email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Quyền" name="role" rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}>
            <Select>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng điền password!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng điền phone!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Năm sinh" name="birth_year" rules={[{ required: true, message: 'Vui lòng điền năm sinh!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng điền thôn xá!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Huyện" name="district" rules={[{ required: true, message: 'Vui lòng điền huyện!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Thành phố" name="city" rules={[{ required: true, message: 'Vui lòng điền thành phố!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateUser;