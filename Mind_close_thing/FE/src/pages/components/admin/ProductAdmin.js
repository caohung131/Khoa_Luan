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

  useEffect(() => {
    setProducts(productData?.productData?.products)
  }, [])

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
        `http://localhost:8000/variant/${variantId}`
      ).then((response) => alert(response.data.message))
      // setProducts((prevProduct) =>
      //   prevProduct.filter((itemt) => (itemt._id != variantId))
      // // console.log(prevProduct)
      // );
      window.location.reload();

    } catch (error) {
      toast({
        status: "error",
        title: "Delete product failed",
        position: "top",
      });
      console.error("Error deleting order:", error);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      await createApiPjc().delete(
        `http://localhost:8000/admin/product/${id}`
      ).then((response) => alert(response.data.message))

      setProducts((itemt) =>
        itemt.filter((product) => product._id !== id)
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ảnh",
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
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <a>{record.category.name}</a>,
    },
    {
      title: "Số lượng",
      key: "countInStock",
      dataIndex: "countInStock",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <CreateVariant id={record._id} />
          <EditProduct id={record._id} />
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
              handleDeleteProduct(record._id);
            }}
          >
            <Button className="bg-red color-white">Xóa</Button>
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
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Màu sắc",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Giá",
        dataIndex: "priceDetail",
        key: "priceDetail",
        render: (_, variants) => <p>{variants.priceDetail.price}đ</p>,
      },
      {
        title: "Phần trăm giảm",
        dataIndex: "priceDetail",
        key: "priceDetail",
        render: (_, variants) => <a>{variants.priceDetail.saleRatio}%</a>,
      },
      {
        title: "Số lượng",
        dataIndex: "countInStock",
        key: "countInStock",
      },
      {
        title: "Hành động",
        dataIndex: "operation",
        key: "operation",
        render: (_, variants) => (
          <Space size="middle">
            <EditVariant id={variants._id} />
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
                handleDeleteVariant(variants._id);
              }}
            >
              <Button style={{ color: "red" }}>Xóa</Button>
            </Popconfirm>
          </Space>
        ),
      },

    ];
    return (
      <Table
        columns={columns}
        dataSource={record.variants}
        pagination={true}
        record={record}
      />
    );
  };


  return (
    <>
      <CreateProduct/>
      {
        products && (<Table
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