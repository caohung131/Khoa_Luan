import React, { useState } from 'react';
import { Button, Modal,  Form,
    Input,
    InputNumber,  Select, } from 'antd';
import { useToast } from "@chakra-ui/react";
import { createProduct, createUser } from '../../services';
import "./cssAdmin.css"
import { createApiPjc } from '../../../services';




const CreateCategory = ({setCategorys, categorys}) => {
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

  // console.log(categorys)


  const onFinish = async (values) => {
        // console.log(values);

        
        try {
            const result = await createApiPjc().post(`http://localhost:8000/product/createCategory`, {
                name: values.name,
                slug: values.slug,
            });

            console.log(result.data.category);
            // setUser(user.filter((item) => item._id == id));
            
            setCategorys([...categorys,result.data.category ])
            alert("Tạo sản phẩm thành công");
            // window.location.reload();
          } catch (error) {
            console.log(error)
            alert("Tạo sản phẩm thất bại")
        }
    }
  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-blue'>
        Create Category
      </Button>
      <Modal
        title="Add Category"
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
            className='bg-blue'
            key="submit"
            form="myForm"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
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
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Vui lòng điền Name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Vui lòng điền Slug!' }]}>
        <Input/>
      </Form.Item>
     
    </Form>
      </Modal>
    </>
  );
};
export default CreateCategory;