import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
// import { Button, Form, Input, Modal, Select } from "antd";
import './cssAdmin.css'
import React, { useContext, useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import EditOrder from "./EditOrder.jsx";
import { DataContext } from "../../../useContextData.js";

const { Option } = Select;

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [number, setNumber] = useState();

  const {orderData, setOrderData} = useContext(DataContext)


  useEffect(() => {

    setOrders([...orderData.orders])
    // console.log('first')
  },[])

  // console.log(dataOrder.orderData.orders)




  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };

  // console.log(dataOrder?.orderData.data.orders);

  // const transformedOrders = transformData(orders);

  //call api trong
  // useEffect(() => {
  //   createApiPjc()
  //     .get(`http://localhost:8000/admin/order/all`)
  //     .then((response) => setOrders(response.data.orders))
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  // useEffect(async () => {
  //   await createApiPjc()
  //     .get(`http://localhost:8000/admin/${selectedCategory}${number}`)
  //     .then((response) => {
  //       if (selectedCategory === "/order-day?day=") {
  //         setOrders(response.data.orderToday);
  //       } else if (selectedCategory === "/order-month?month=") {
  //         setOrders(response.data.orderMonth);
  //       } else if (selectedCategory === "/order-year?year=") {
  //         setOrders(response.data.orderYear);
  //       } else {
  //         setOrders(response.data.order);
  //       }
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, [selectedCategory]);

  const deleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast({
        status: "success",
        title: "Xoá người dùng thành công",
        position: "top",
      });
      setOrders(orders.filter((item) => item._id != id));
    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
    }
  };
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Image",
        dataIndex: "variant",
        key: "variant",
        render: (_, variants) => (
          <>
            <img
              width={40}
              height={40}
              src={variants.image}
              onError={(e) =>
                (e.target.src =
                  "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
              }
            />
          </>
        ),
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a>Edit</a>
            {console.log(record)}
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record?.orderDetail}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (_, record) => <a>{record.orderedBy.email}</a>,
    },
    {
      title: "Pay",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) => <a>{text === false ? "Un Paid" : "Paid"}</a>,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      onchange: (value) => {
        console.log(value.target.value);
      },
      render: (record) => {
        // console.log(record)
        if(record === "0") {
          return <Button className="bg-red color-white ">Đã hủy</Button>
        } else if(record === "1") {
          return <Button className="bg-orange color-white">Đang chờ duyệt</Button>
        } else if (record == "2") {
            return <Button className="bg-green color-white">Đã xác nhận</Button>
         }

         
      }
    },
    {
      title: "Action",
      key: "action",
   

      render: (_, record) => (
        <Space size="middle" className= "bg-blue color-white" >
          {/* {console.log(record.orderedBy.email)} */}
          <EditOrder id={record._id} className= "bg-blue color-white" value= {orders} setOrders={setOrders}  />
          {/* {console.log(record)} */}
          {/* <EditProduct id={record._id} /> */}
          {/* <Popconfirm
            style={{ color: "red" }}
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={() => {
              handleDeleteOrder(record._id);
            }}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm> */}
        </Space>
      ),


    },
  ];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setSelectedCategory(values.timeSet.category);
    setNumber(values.timeSet.number);
  };

  // console.log(orders);

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Filter by">
          <Space.Compact>
            <Form.Item name={["timeSet", "category"]} noStyle>
              <Select placeholder="Select one">
                <Option value="">All</Option>
                <Option value="/order-day?day=">Day</Option>
                <Option value="/order-month?month=">Month</Option>
                <Option value="/order-year?year=">Year</Option>
              </Select>
            </Form.Item>
            <Form.Item name={["timeSet", "number"]} noStyle>
              <Input
                style={{
                  width: "50%",
                }}
                placeholder="Input"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {orders && (
        <Table
          columns={columns}
          dataSource={transformData(orders)}
          expandable={{ expandedRowRender }}
        />
      )}
    </>
  );
};
export default OrderAdmin;
