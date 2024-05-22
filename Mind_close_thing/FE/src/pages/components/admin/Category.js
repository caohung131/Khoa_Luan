import { useToast } from "@chakra-ui/react";
import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
// import { Button, Form, Input, Modal, Select } from "antd";
import './cssAdmin.css'
import React, { useContext, useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import EditOrder from "./EditOrder.jsx";
import { DataContext } from "../../../useContextData.js";
import CreateCategory from "./CreateCategory.js";
import EditCategory from "./EditCategory.js";

const { Option } = Select;

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [number, setNumber] = useState();




  // console.log(dataOrder.orderData.orders)


  const deleteCategory = async (id) => {
    try {
      await createApiPjc().delete(`http://localhost:8000/category/${id}`)
      alert("Xóa thành công")
      setCategorys(categorys.filter((item) => item._id != id));

    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
    }
  };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };

  //call api trong
  useEffect(() => {
    createApiPjc()
      .get(`http://localhost:8000/product/getCategoryAll`)
      .then((response) => setCategorys(response.data?.categories ))
      .catch((error) => console.error("Error:", error));
  }, []);


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    //   render: (_, record) => <a>{record.orderedBy.email}</a>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    //   render: (text) => <a>{text === false ? "Un Paid" : "Paid"}</a>,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    }
    ,
    {
        title: "Update at",
        dataIndex: "updatedAt",
        key: "updatedAt",
    }
    ,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditCategory record={record._id}  setCategorys={setCategorys}  categorys={categorys}/>
          <Popconfirm
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
              deleteCategory(record._id);
              // setCategorys(categorys.filter(item != item))
            }}
          >

            <Button className="bg-red color-white">Delete</Button>
          </Popconfirm>

         
        </Space>
        // console.log(record._id)
      ),
    },
  ];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setSelectedCategory(values.timeSet.category);
    setNumber(values.timeSet.number);
  };

  

  return (
    <>
      <Form onFinish={onFinish}>
       <CreateCategory setCategorys={setCategorys}  categorys={categorys}/>
      </Form>
      {categorys && (
        <Table
          columns={columns}
          dataSource={categorys}
        />
      )}
    </>
  );
};
export default Category;
