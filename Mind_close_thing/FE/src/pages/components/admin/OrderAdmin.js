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

  const handleDeleteOrder = async (id) => {
    try {
      // console.log(id);

      await createApiPjc().delete(`http://localhost:8000/order/${id}`)
      // toast({
      //   status: "success",
      //   title: "Xoá người dùng thành công",
      //   position: "top",
      // });
      setOrders(orders.filter((item) => item._id != id));
    } catch (error) {
      alert("Xóa order thất bại")
    }
  }

  const expandedRowRender = (record) => {
    // console.log(record)

    const columns = [
      {
        title: "Ảnh",
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
        title: "Tên",
        dataIndex: "variant",
        key: "variant",
        render: (_, record) => <a>{record.variant?.name}</a>,
      },
      {
        title: "Màu sắc",
        dataIndex: "variant",
        key: "variant",
        render: (_, record) => <a>{record.variant?.color}</a>,
      },
      {
        title: "Size",
        render: (_, record) => <a>{record.variant?.size}</a>,
      },
      {
        title: "Giá ",
        render: (_, record) => <a>{record.variant?.priceDetail?.priceAfterSale}</a>,
      },
      {
        title: "key",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "Số lượng",
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
      title: "Email",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (_, record) =>
        //trả tất cả object order
        // console.log(record),
        <a>{record?.orderedBy?.email}</a>
    },
    {
      title: "Tên",
      render: (_, record) =>
        <a>{record?.orderedBy?.username}</a>
    },
    {
      title: "Ngày tạo",
      render: (_, record) => {
        return <a>{record?.orderedBy?.role}</a>
      }
    },
    {
      title: "Số điện thoại",
      render: (_, record) => {
        return <a>{record?.orderedBy?.phone}</a>
      }
    },
    {
      title: "Địa chỉ",
      render: (_, record) => {
        return <a>{record?.shippingAddress?.address}</a>
      }
    },

    {
      title: "Thành phố",
      render: (_, record) => {
        return <a>{record?.shippingAddress?.city}</a>
      }
    },

    {
      title: "Huyện",
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      // onchange: (value) => {
      //   console.log(value.target.value);
      // },
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
    {
      title: "Hành động",
      key: "action",


      render: (_, record) => (
        <Space size="middle" className=" color-white" >
          {/* {console.log(record.orderedBy.email)} */}
          <EditOrder id={record._id} className="bg-blue color-white" value={orders} setOrders={setOrders} />
          {/* {console.log(record)} */}
  
          <Popconfirm
              className="bg-red color-white with100"
              title="Bạn có chắc chắn muốn xác nhận không?"
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{
                style: { backgroundColor: '#1E90FF', color: 'white' }
              }}
              cancelButtonProps={{
                style: { backgroundColor: '#f0f0f0', color: 'rgba(0, 0, 0, 0.85)' }
              }}
              onConfirm={() => {
                handleDeleteOrder(record._id);
              }}
            >
              <Button style={{ color: "red" }}>Xóa</Button>
            </Popconfirm>
        </Space>
      ),


    },

  ];

  const onFinish = async (values) => {
    try {
      // console.log("Received values of form: ", values.timeSet.category);
      const result = await createApiPjc().get(`http://localhost:8000/admin${values.timeSet.category}`)
      if (result.data.orderYear) {
        setOrders(result.data.orderYear)
      } else 
      if (result.data.orderMonth) {
        setOrders(result.data.orderMonth)
      } else 
      if (result.data.orderToday) {
        // if(result.data.orderToday == '') {
        //   return <p>a</p>
        // }
        setOrders(result.data.orderToday)
      } else if (result.data.orders) {
        setOrders(result.data.orders)
      }
      // console.log(result.data);
    } catch (error) {

    }
  };

  // console.log(orders);

  const handleSearch = (e) => {
    // console.log(e.target.value);
    // const searchEle = document.querySelector("#search_user");
    const newData = orders.filter((item) => {
      return item?.orderedBy?.email.toUpperCase().includes(e.target.value.toUpperCase()); //trả email bao gồn kí tự nhập
      // console.log(item.orderedBy.email)
    });

    if(e.target.value == "") {
      // console.log(orderData)
      setOrders(orderData.orders)

    }else if(newData != "") {
      setOrders(newData)
    }
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Tìm theo:">
          <Space.Compact>
            <Form.Item name={["timeSet", "category"]} noStyle>
              <Select placeholder="Tất cả"  style={{
                  width: "100px",
                }}>
                <Option value="/order/all">Tất cả</Option>
                <Option value="/order-day?day=">Hôm nay</Option>
                <Option value="/order-month?month=">Tháng này</Option>
                <Option value="/order-year?year=">Năm nay</Option>
              </Select>
            </Form.Item>
           
          </Space.Compact>
          <Form.Item name={["timeSet", "number"]} noStyle>
              <Input
                style={{
                  width: "50%",
                }}
                placeholder="Nhập email bạn cần tìm kiếm"
                onChange={handleSearch}
              />
            </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit" className="bg-blue">
            Tìm kiếm
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
