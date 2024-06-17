// import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useState } from "react";
import { createApiPjc } from "../../../services";
import "./cssAdmin.css"

const CreateProduct = ({products, setProducts}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  // const toast = useToast();


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

  const onFinish = async (values) => {
    try {
      console.log(values.category);
      const result = await createApiPjc().post(
        `http://localhost:8000/admin/product/${values.category}`,
        {
          name: values.name,
          slug: values.slug,
          detailProduct: {
            material: values.material,
            form: values.form,
            color: values.color,
            design: values.design,
            image: values.image,
          },
          thumbnail: values.thumbnail,
        }
      );
      
      // console.log(products)
      // console.log(result.data.product)
      setProducts([...products, result.data.product])


      // window.location.reload();

      alert("Tạo sản phẩm thành công");
    } catch (error) {
      console.log(error);
      alert("Tạo sản phẩm thất bại");
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue">
        Tạo mới 1 sản phẩm
      </Button>
      <Modal
        title="Thêm sản phẩm"
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
          id="myForm"
          onFinish={onFinish}
        >
          <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Please select one!" }]}
          >
            <Select>
              <Select.Option value="65465abf81225ec455f35aba">
                Áo Thun
              </Select.Option>
              <Select.Option value="65465ae281225ec455f35abc">
                Baby Tee
              </Select.Option>
              <Select.Option value="65465af581225ec455f35abe">
                Áo Polo
              </Select.Option>
              <Select.Option value="65465b1e81225ec455f35ac0">
                Áo sơ mi
              </Select.Option>
              <Select.Option value="65465b6f81225ec455f35ac2">
                Áo khoác
              </Select.Option>
              <Select.Option value="65465ba081225ec455f35ac4">
                Hoodie
              </Select.Option>
              <Select.Option value="65465bc081225ec455f35ac6">
                Quần
              </Select.Option>
              <Select.Option value="65465be081225ec455f35ac8">
                Quần nữ
              </Select.Option>
              <Select.Option value="65465c0081225ec455f35aca">
                Phụ kiện
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chất liệu" name="material"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Form" name="form" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Màu sắc" name="color"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Design" name="design"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Chi tiết ảnh" name="image" >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đường dẫn ảnh"
            name="thumbnail"
            rules={[{ required: true, message: "Please fill the blank!" }]}
          >
             <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateProduct;
