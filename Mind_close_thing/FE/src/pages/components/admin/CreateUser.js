import React, { useState } from 'react';
import { Button, Modal,  Form,
    Input,
    InputNumber,  Select, } from 'antd';
import { useToast } from "@chakra-ui/react";
import { createProduct, createUser } from '../../services';
import "./cssAdmin.css"
import { createApiPjc } from '../../../services';
import Password from 'antd/es/input/Password';



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
            const result = await createApiPjc().post(`http://localhost:8000/user/register`, {
              username: values.username,
              email: values.email,
              role: values.role,
              password: values.password,
              phone: values.phone,
              birth_year: values.birth_year,
              shippingAddress : {
                address: values.address,
                district: values.district,
                city: values.city,
              }
            });

            // setUser(user.filter((item) => item._id == id));
            
            // console.log(result);
            alert("Tạo người dùng thành công");
            // window.location.reload();
          } catch (error) {
            console.log(error)
            alert("Tạo người dùng thất bại")
        }
    }
  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-blue'>
        Create a new user
      </Button>
      <Modal
        title="Add user"
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
            Submit
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
      <Form.Item label="Username" name="username" rules={[{ required: true , message: "Vui lòng điền username"}]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng điền email!' }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}>
        <Select>
          <Select.Option value="customer">Customer</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Vui lòng điền password!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Vui lòng điền phone!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Birth Year" name="birth_year" rules={[{ required: true, message: 'Vui lòng điền năm sinh!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Vui lòng điền thôn xá!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="District" name="district" rules={[{ required: true, message: 'Vui lòng điền huyện!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true, message: 'Vui lòng điền thành phố!' }]}>
        <Input />
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};
export default CreateUser;