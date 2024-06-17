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

      ).then((response) => alert(response.data.message));

      // alert('Tạo variant thành công')
      window.location.reload();


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
      <Button type="primary" onClick={showModal} color="black" className="bg-blue">
      Thêm variant
      </Button>
      <Modal
        title="Thêm variant"
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
            className="bg-blue"
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
          id="myForm"
          onFinish={onFinish}
        >
          <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item label="Ảnh" name="image" rules={[{ required: true }]}>
            <Input className="input" />
          </Form.Item>
          <Form.Item label="Giá" name="price" rules={[{ required: true }]}>
            <InputNumber className="input" />
          </Form.Item>
          <Form.Item
            label="Giảm %"
            name="saleRatio"
            rules={[{ required: true }]}
          >
            <InputNumber className="input"/>
          </Form.Item>
          <Form.Item label="Màu sắc" name="color" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item label="Kích thước" name="size" rules={[{ required: true }]}>
            <Input className="input"/>
          </Form.Item>
          <Form.Item
            label="Số lượng kho"
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
