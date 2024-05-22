import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
// import { Button, Form, Input, Modal, Select } from "antd";
import '../components/admin/cssAdmin.css'
import React, { useContext, useEffect, useState } from "react";
import EditOrder from "../../pages/components/admin/EditOrder.jsx";
import { DataContext } from "../../useContextData.js";
import Headers from "./Header.jsx";
import emptyCartSvg from "../../assets/images/cart_empty.svg";

const { Option } = Select;

const OrderUser = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();
  const [number, setNumber] = useState();

  const {orderData, setOrderData, setSelectedCategory, selectedCategory} = useContext(DataContext)



  useEffect(() => {

    setOrders(dataNew)
  },[orderData?.orders])

  // console.log(orderData?.orders)



  const dataNew = orderData?.orders?.filter((item) => {
    // console.log(item.orderedBy._id)
    // console.log(JSON.parse(localStorage.getItem('user/admin')) )
    // console.log(JSON.parse(localStorage.getItem('user')) )

    if (JSON.parse(localStorage.getItem('user/admin'))?.id   == item.orderedBy._id
        || JSON.parse(localStorage.getItem('user'))?.id   == item.orderedBy._id
  ) {
        return {
          ...item,
          _id: item._id,
        }
    } 
});


  

  // const transformData2 = (data) => {
  //   return data?.filter((item) => {
  //       // console.log(item.orderedBy._id)
  //       // console.log(JSON.parse(localStorage.getItem('user/admin')) )
  //       // console.log(JSON.parse(localStorage.getItem('user')) )

  //       if (JSON.parse(localStorage.getItem('user/admin')).id   === item.orderedBy._id
  //           || JSON.parse(localStorage.getItem('user'))?.id   === item.orderedBy._id
  //     ) {
  //           return {
  //             ...item,
  //             _id: item._id,
  //           }
  //       }
  //   });
  // };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };




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
        render: (_, record) => <a>{record.variant?.name }</a>,
      },
      {
        title: "Color",
        dataIndex: "variant",
        key: "variant",
        render: (_, record) => <a>{record.variant?.color }</a>,
      },
      {
        title: "Size",
        render: (_, record) => <a>{record.variant?.size }</a>,
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
        pagination={false}
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
        if(record === "0") {
          return <Button className="bg-red color-white ">Đã hủy</Button>
        } else if(record === "1") {
          return <Button className="bg-orange color-white">Đang chờ duyệt</Button>
        } else if (record == "2") {
            return <Button className="bg-green color-white">Đã xác nhận</Button>
         } else if (record == "3") {
          return <Button className="bg-green color-white">Đang giao hàng</Button>
       }  else if (record == "4") {
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
      {/* <Form onFinish={onFinish}>
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
      </Form> */}
      <h2 className="displayFlex">
        Sản phẩm bạn đã order
      </h2>
      <Headers />
      
      <br />
      <br />
      {orders && (
        <Table
          columns={columns}
          dataSource={ dataNew ? transformData(orders) : 
          // (
          //   <div className="flex flex-col justify-center items-center gap-3">
          //     <img src={emptyCartSvg} alt="empty cart" className="w-24 h-24" />
          //     <span>Không có sản phẩm nào trong giỏ hàng của bạn</span>
          //   </div>
          // )

          ""
          }
          expandable={{ expandedRowRender }}
        />
      )}
    </>
  );
};
export default OrderUser;
