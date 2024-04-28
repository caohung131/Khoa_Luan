import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import  "./cssAdmin.css"

const CreateVariant = (id) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);

  
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 4000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      const result = await createApiPjc().post(
        `http://localhost:8000/admin/variant/create-variant/${id.id}`,
        {
          name: values.name,
          image: values.image,
          priceDetail: {
            price: values.price,
            saleRatio: values.saleRatio,
          },
          color: values.color,
          size: values.size,
          countInStock: values.countInStock,
        }
      );

      alert('Tạo variant thành công')

      toast({
        status: "success",
        title: "Tạo sản phẩm thành công",
        position: "top",
      });


    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "Tạo sản phẩm thất bại",
        position: "top",
      });
    }
  };

  // useEffect( () => {

  // },[])
  return (
    <>
      <Button type="dashed" onClick={showModal} color="black">
        Add variant
      </Button>
      <Modal
        title="Add variant"
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
            type="dashed"
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
          id="myForm"
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true }]}>
            <Input className="input" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber className="input" />
          </Form.Item>
          <Form.Item
            label="Sale Ratio"
            name="saleRatio"
            rules={[{ required: true }]}
          >
            <InputNumber className="input"/>
          </Form.Item>
          <Form.Item label="Color" name="color" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item label="Size" name="size" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[{ required: true }]}
          >
            <InputNumber className="input" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateVariant;
