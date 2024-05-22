import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getVariantById } from "../../services";
import "./cssAdmin.css"
import { createApiPjc } from "../../../services";
import { DataContext } from "../../../useContextData.js"

const EditVariant = (id) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();

  const { productData, setProductData } = useContext(DataContext)


  // console.log(id.id);
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
    console.log("Clicked cancel button");
    setOpen(false);
  };



  const getVariant = async () => {
    try {
      // const variant = await getVariantById(id.id);

      const variant = await createApiPjc().
        get(`http://localhost:8000/variant/${id.id}`)

      console.log(variant);

      console.log(variant);
      form.setFieldValue("name", variant.data.variant.name);
      form.setFieldValue("image", variant.data.variant.image);
      form.setFieldValue("price", variant.data.variant.priceDetail.price);
      form.setFieldValue(
        "saleRatio",
        variant.data.variant.priceDetail.saleRatio
      );
      form.setFieldValue("color", variant.data.variant.color);
      form.setFieldValue("size", variant.data.variant.size);
      form.setFieldValue("countInStock", variant.data.variant.countInStock);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      const result = await createApiPjc().put(
        `http://localhost:8000/admin/variant/${id.id}`,
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

      window.location.reload();


      alert("Cập nhật variant thành công")

    } catch (error) {
      console.log(error);
      alert("Cập nhật sản phẩm thất bại")
    }
  };

  useEffect(() => {
    getVariant();
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue">
        Edit
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
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            className="bg-blue"
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
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input className="with-100" />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true }]}>
            <Input className="with-100" />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber className="with-100" />
          </Form.Item>
          <Form.Item label="Sale Ratio" name="saleRatio">
            <InputNumber className="with-100" />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input className="with-100" />
          </Form.Item>
          <Form.Item label="Size" name="size">
            <Input className="with-100" />
          </Form.Item>
          <Form.Item label="Count In Stock" name="countInStock">
            <InputNumber className="with-100" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditVariant;
