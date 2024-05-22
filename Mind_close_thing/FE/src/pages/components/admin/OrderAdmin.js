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
  const [number, setNumber] = useState();

  const { orderData, setOrderData, setSelectedCategory, selectedCategory } = useContext(DataContext)

  useEffect(() => {

    setOrders(dataNew)
  }, [orderData?.orders])

  // console.log(orderData?.orders)



  const dataNew = orderData?.orders?.filter((item) => {
    return {
      ...item,
      _id: item._id,
    }

  });

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
  // const expandedRowRender = (record) => {
  //   const columns = [
  //     {
  //       title: "Image",
  //       dataIndex: "variant",
  //       key: "variant",
  //       render: (_, variants) => (
  //         console.log(variants?.variant)
  //         // <>

  //         //   <img
  //         //     width={40}
  //         //     height={40}
  //         //     src={variants?.variant?.image}
  //         //     onError={(e) =>
  //         //       (e.target.src =
  //         //         "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
  //         //     }
  //         //   />
  //         // </>
  //       ),
  //     },
  //     {
  //       title: "Color",
  //       dataIndex: "color",
  //       key: "color",
  //       render: (_, value) => (
  //         <p>{value?.variant?.name}</p>
  //       )
  //     },
  //     {
  //       title: "Size",
  //       dataIndex: "size",
  //       key: "size",
  //     },
  //     {
  //       title: "Quantity",
  //       dataIndex: "quantity",
  //       key: "quantity",
  //     },
  //     {
  //       title: "Action",
  //       dataIndex: "operation",
  //       key: "operation",
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <a>Edit</a>
  //           {console.log(record)}
  //           <a>Delete</a>
  //         </Space>
  //       ),
  //     },
  //   ];

  //   return (
  //     <Table
  //       columns={columns}
  //       dataSource={record.orderDetail}
  //       pagination={false}
  //     />
  //   );
  // };

  const expandedRowRender = (record) => {
    console.log(record)

    const columns = [
      {
        title: "Image",
        render: (_, record) => (
          //trả về orderDetails 

          <>
            <img
              width={40}
              height={40}
              src={record.variant?.image}
              onError={(e) =>
              (e.target.src =
                "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
              }
            />
          </>

          // console.log(record.variant?.priceDetail?.priceAfterSale)
          // console.log(record)
        ),
      },
      {
        title: "Name",
        dataIndex: "variant",
        key: "variant",
        render: (_, record) => <a>{record.variant?.name}</a>,
      },
      {
        title: "Color",
        dataIndex: "variant",
        key: "variant",
        render: (_, record) => <a>{record.variant?.color}</a>,
      },
      {
        title: "Size",
        render: (_, record) => <a>{record.variant?.size}</a>,
      },
      {
        title: "Size",
        render: (_, record) => <a>{record.variant?.priceDetail?.priceAfterSale}</a>,
      },
      {
        title: "key",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      // {
      //   title: "Action",
      //   dataIndex: "operation",
      //   key: "operation",
      //   render: (_, record) => (
      //     <Space size="middle">
      //       <a>Edit</a>
      //       {console.log(record)}
      //       <a>Delete</a>
      //     </Space>
      //   ),
      // },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record?.orderDetail}
        pagination={true}
      />
    );
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (_, record) =>
        //trả tất cả object order
        // console.log(record),
        <a>{record?.orderedBy?.email}</a>
    },
    {
      title: "User Name",
      render: (_, record) =>
        <a>{record?.orderedBy?.username}</a>
    },
    {
      title: "Created at",
      render: (_, record) => {
        return <a>{record?.orderedBy?.role}</a>
      }
    },
    {
      title: "Phone",
      render: (_, record) => {
        return <a>{record?.orderedBy?.phone}</a>
      }
    },
    {
      title: "Address",
      render: (_, record) => {
        return <a>{record?.shippingAddress?.address}</a>
      }
    },

    {
      title: "City",
      render: (_, record) => {
        return <a>{record?.shippingAddress?.city}</a>
      }
    },

    {
      title: "district",
      render: (_, record) => {
        return <a>{record?.shippingAddress?.district}</a>
      }
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
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
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
        if (record === "0") {
          return <Button className="bg-red color-white ">Đã hủy</Button>
        } else if (record === "1") {
          return <Button className="bg-orange color-white">Đang chờ duyệt</Button>
        } else if (record == "2") {
          return <Button className="bg-green color-white">Đã xác nhận</Button>
        } else if (record == "3") {
          return <Button className="bg-green color-white">Đang giao hàng</Button>
        } else if (record == "4") {
          return <Button className="bg-green color-white">Giao hàng thành công</Button>
        }


      }
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
