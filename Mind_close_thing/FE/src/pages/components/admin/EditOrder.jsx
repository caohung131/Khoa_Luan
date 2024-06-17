import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import "./cssAdmin.css";
import axios from "axios";
import { getOrderById } from "../../services";
import { DataContext } from "../../../useContextData";

// import { findById } from "../../../../../BE/models/Variant";
// import editOrder from './editOrder';

const EditOrder = ({id, orders, setOrders}) => {
  const [open, setOpen] = useState(false);
  const [orderItem, setOderItem] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();

  // const {orderData, setOrderData} = useContext(DataContext)
  // console.log(orderData.orders);
  // console.log(props)

  

  // useEffect(() => {
  //   // setOrderData(props.value);
  //   setOrders([...orders])
  //   // console.log('1')

  // },[])

  useEffect(() => {
    getFieldOrder();
  }, []);



 
  const getFieldOrder = async () => {
    const order = await createApiPjc().get(
      `http://localhost:8000/order/${id}`
    );

    // console.log(order.data.order);
    // console.log(orderItem.data)

    // console.log(name)
    // console.log(order.data.order);
    form.setFieldValue("customer", order.data.order?.orderedBy?.email);
    form.setFieldValue("status", order.data.order.stutus);
    form.setFieldValue("pay", order.data.order.paymentMethod);
    form.setFieldValue("form", order.data.order.stutus);

    // form.setFieldValue("customer", order.data.order.customer);
    // form.setFieldValue("pay", Date.now());
    // form.getFieldValue("customer",order.data.order.orderedBy   )
  };



  const showModal = async () => {
    setOpen(true);

    try {
      const result = await createApiPjc().get(
        `http://localhost:8000/order/${id}`
      );

      // console.log(result.data.order)
      const order = result.data.order;
      // console.log(order)
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
    // console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = async (values) => {
    // console.log(values);
    // return 0;
    try {
      const result = await createApiPjc().put(
        `http://localhost:8000/order/update-status-order/${id}`,
        {
          ...orderItem,
          status: values.status,
        }
      );

      console.log(result);
      alert("Tạo sản phẩm thành công");

      setOpen(false);
      window.location.reload();
      // form.resetFields()
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

  // console.log(orderItem)


  return (
    <>
      <Button type="default" onClick={showModal} color="white" className="bg-blue color-white">
        Thay đổi trạng thái 
      </Button>
      <Modal
        title="Sửa trạng thái"
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
        form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
         
          style={{
            maxWidth: 800,
          }}
          autoComplete="off"
          id="myForm"
          onFinish={onFinish}
        >

          <Form.Item
            label="Khách hàng"
            name="customer"
            // rules={[{ required: true }]}
          >
            <Input className="input"/>
          </Form.Item>

          <Form.Item label="Pay" name="pay">
            <Input className="input" disabled={true} />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Please select one!" }]}
            // value={orderItem?.status}
          >
            <Select name="status" >
              <Select.Option value="1">Chưa xác nhận</Select.Option>
              <Select.Option value="2">Xác nhận</Select.Option>
              <Select.Option value="0">Đã hủy</Select.Option>
              <Select.Option value="3">Đang giao hàng</Select.Option>
              <Select.Option value="4">Giao hàng thành công</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditOrder;
