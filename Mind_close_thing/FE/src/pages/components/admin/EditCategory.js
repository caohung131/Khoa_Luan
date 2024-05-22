import React, { useEffect, useState } from 'react';
import { Button, Modal,  Form,
    Input,
    InputNumber,  Select, } from 'antd';
import { useToast } from "@chakra-ui/react";
import { createProduct, createUser } from '../../services';
import "./cssAdmin.css"
import { createApiPjc } from '../../../services';




const EditCategory = ({record, categorys, setCategorys}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm()
  const toast = useToast()

  // console.log(categorys)


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
  

  useEffect(() => {
    getCategory();
  }, []);


  const onFinish = async (values) => {
        console.log(values);


        
        try {
        console.log(categorys);

            const result = await createApiPjc().put(`http://localhost:8000/category/${record}`, {
                name: values.name,
                slug: values.slug,
            });

            console.log(result.data.category);

            alert(result.data.message);
            // setCategorys([...categorys, result.data.category])
            window.location.reload();
          } catch (error) {
            console.log(error)
            alert("Update category thất bại")
        }
    }


    // useEffect(() => {
    //   createApiPjc()
    //     .get(`http://localhost:8000/product/getCategoryAll`)
    //     .then((response) => setCategorys(response.data?.categories ))
    //     .catch((error) => console.error("Error:", error));
    // }, []);
    const getCategory = async () => {
      try {
        const category = await createApiPjc().get(`http://localhost:8000/category/${record}`);
        console.log(category.data.category.name)
        form.setFieldValue("name", category.data.category.name);
        form.setFieldValue("slug", category.data.category.slug);
       
      } catch (error) {
        console.log(error);
      }
    };

 
  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-blue'>
        Edit Category
      </Button>
      <Modal
        title="Edit Category"
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
export default EditCategory;