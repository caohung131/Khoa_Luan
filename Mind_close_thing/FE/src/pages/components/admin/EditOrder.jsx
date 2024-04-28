import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import "./cssAdmin.css";
import axios from "axios";
import { getOrderById } from "../../services";

// import { findById } from "../../../../../BE/models/Variant";
// import editOrder from './editOrder';

const EditOrder = (id) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();

  const [orderItem, setOderItem] = useState([]);

  const getFieldOrder = async () => {
    const order = await createApiPjc().get(
      `http://localhost:8000/order/${id.id}`
    );

    // console.log(order.data.order.status);
    form.setFieldValue("status", order.data.order.stutus);
    // form.setFieldValue("customer", order.data.order.customer);
    // form.setFieldValue("pay", Date.now());
    // form.getFieldValue("customer",order.data.order.orderedBy   )
  };

  const showModal = async () => {
    setOpen(true);

    try {
      const result = await createApiPjc().get(
        `http://localhost:8000/order/${id.id}`
      );

      // console.log(result.data.order)
      const order = result.data.order;
      setOderItem(order);
    } catch (error) {
      return error.message;
    }
  };

  // console.log(orderItem);

  const handleOk = async (values) => {
 
    setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    // return 0;
    try {
      const result = await createApiPjc().put(
        `http://localhost:8000/order/update-status-order/${id.id}`,
        {
          ...orderItem,
          status: values.status,
        }
      );

      toast({
        status: "success",
        title: "Tạo sản phẩm thành công",
        position: "top",
      });

      alert("Tạo sản phẩm thành công");
      setOpen(false);

      this.refresh()
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "Tạo sản phẩm thất bại",
        position: "top",
      });
    }
  };

  useEffect(() => {
    getFieldOrder();
  }, []);

  return (
    <>
      <Button type="default" onClick={showModal} color="white">
        Edit Order
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
          // initialValues={{
          //   status: "1",
          // }}
          // status="1"
          style={{
            maxWidth: 800,
          }}
          autoComplete="off"
          id="myForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Customer"
            name="customer"
            // rules={[{ required: true }]}
            value={orderItem?.status}
          ></Form.Item>
          <Input className="input" value={orderItem?.status} disabled={true} />

          <Form.Item label="Pay" name="pay"></Form.Item>
          <Input className="input" value={orderItem?.status} disabled={true} />

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select one!" }]}
            value={orderItem?.status}
          >
            <Select name="status" value={orderItem?.status}>
              <Select.Option value="1">Chưa xác nhận</Select.Option>
              <Select.Option value="2">Xác nhận</Select.Option>
              <Select.Option value="0">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditOrder;
