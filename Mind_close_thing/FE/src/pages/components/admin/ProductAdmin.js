import { useToast } from "@chakra-ui/react";
import { Button, Pagination, Popconfirm, Space, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { createApiPjc } from "../../../services";
import { getProduct } from "../../services";
import CreateProduct from "./CreateProduct";
import CreateVariant from "./CreateVariant";
import EditProduct from "./EditProduct";
import EditVariant from "./EditVariant";
import axios from "axios";
import "./cssAdmin.css"
import { DataContext } from "../../../useContextData";

const ManageProduct = () => {
  const [pageSize, setPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState(1);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const toast = useToast();
  const [variantId, setVariantId] = useState();
  const [dataVariants, setDataVariants] = useState();

  const productData = useContext(DataContext)

  // console.log(productData.productData.products)


  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item?._id,
      };
    });
  };

  useEffect( ()=> {
    setProducts(productData?.productData?.products)
  },[])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/product")
  //     .then((response) => {
  //       // console.log(response.data.products)

  //       setProducts(response.data.products); // call api trả về data là mảng 
        
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  //     });
  // }, []);

  // const transformedProducts = transformData(products); // Hàm để dữ liệu product từ Obj sang mảng
  // // console.log(transformedProducts);
  

  const getPagingProduct = async () => {
    try {
      const result = await getProduct(pageSize, pageIndex);
      setProducts(result.data.products);
      setCount(result.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteVariant = async (variantId) => {
    try {
      await createApiPjc().delete(
        `http://localhost:8000/admin/variant/${variantId}`
      );
      setProducts((prevOrders) =>
        prevOrders.filter((order) => order.variants._id !== variantId)
      );
      toast({
        status: "success",
        title: "Xoá sản phẩm thành công",
        position: "top",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
      console.error("Error deleting order:", error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await createApiPjc().delete(
        `http://localhost:8000/admin/product/${orderId}`
      );
      setProducts((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      toast({
        status: "success",
        title: "Xoá sản phẩm thành công",
        position: "top",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    getPagingProduct();
  }, [pageSize, pageIndex]);


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (value) => (
        <>
          <img
            width={40}
            height={40}
            src={value}
            onError={(e) =>
              (e.target.src =
                "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
            }
          />
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <a>{record.category.name}</a>,
    },
    {
      title: "Quantity",
      key: "countInStock",
      dataIndex: "countInStock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <CreateVariant id={record._id} />
          <EditProduct id={record._id}  />
          <Popconfirm
            className="bg-red"
            style={{ color: "red" }}
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={() => {
              handleDeleteOrder(record._id);
            }}
          >
            <Button className="bg-red color-white">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    {
    console.log(record);

    }
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
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
        title: "Name",
        dataIndex: "name",
        key: "name",
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
        title: "Price",
        dataIndex: "priceDetail",
        key: "priceDetail",
        render: (_, variants) => <p>{variants.priceDetail.price}đ</p>,
      },
      {
        title: "Sale Ratio",
        dataIndex: "priceDetail",
        key: "priceDetail",
        render: (_, variants) => <a>{variants.priceDetail.saleRatio}%</a>,
      },
      {
        title: "Quantity",
        dataIndex: "countInStock",
        key: "countInStock",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_, variants) => (
          <Space size="middle">
            <EditVariant id={variants._id}  />
            <Popconfirm
              className="bg-red color-white with100"
              style={{ color: "red" }}
              title="Delete product"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                handleDeleteVariant(variants._id);
              }}
            >
              <Button style={{ color: "red" }}>Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },

    ];
    return (
      <Table
        columns={columns}
        dataSource={record.variants}
        // dataSource={products}
        pagination={true}
        record={record}
      />
    );
  };


  return (
    <>
      <CreateProduct />
      {
        products && ( <Table
          columns={columns}
          dataSource={transformData(products)} // nơi đổ product từ antd, do nó chưa có id chuẩn nên chưa nhận chuẩn cần set lại id
          pagination={true}
          // expandable={{ expandedRowRender, defaultExpandedRowKeys: [] }}
            expandable={{ expandedRowRender }}
  
          style={{ marginTop: "10px" }}
        />)
      }
      <Pagination
        current={pageIndex}
        pageSize={pageSize}

        total={count}
        style={{ marginTop: "10px" }}
        onChange={(page, pageSize) => {
          setPageIndex(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
        pageSizeOptions={[3, 5, 8]}
      />
    </>
  );
};

export default ManageProduct;
