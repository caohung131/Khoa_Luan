import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../../useContextData";

import { Pagination } from 'antd';


const Product = () => {
  const [products, setProducts] = useState([]);
  const { productData, dataSearch, selectedCategory } = useContext(DataContext);

  const [current, setCurrent] = useState(1);
  const pageSize = 12;

  // console.log(dataProduct?.productData?.products)

  useEffect(() => {
    if (dataSearch.length == 0) {
      setProducts(productData.products);
    } else {
      setProducts(dataSearch);
    }
  }, [productData.products, dataSearch]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((response) => {
        // console.log(response.data.products)

        setProducts(response.data.products); // call api trả về data là mảng
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  // console.log(dataProduct);

  // console.log(dataProduct)
  const formatNumber = (number) => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 container">
        {products?.slice((current - 1) * pageSize, current * pageSize)
        // && //có product mới chạy
        //   products
        //     .filter(
        //       (data) =>
        //         !selectedCategory || data?.category.name === selectedCategory //trả về category null hoặc trả về ten theo category
        //     )
            ?.map((data) => (
              <div
                className="w-[] p-2.5 m-2.5 text-center border border-[#ddd] rounded-lg"
                key={data.id}
              >
                <Link to={`/detail/${data._id}`} className="with-anh" >
                  <img src={data.thumbnail} alt="#"  className="with-anh"/>
                </Link>
                <Link to={`/detail/${data._id}`}>
                  <p>{data.name}</p>
                </Link>
                <p className="name">{data.category.name}</p>
                <div className="price-math">
                  <h4>
                    {(data.priceDetail &&
                      formatNumber(
                        data.priceDetail.price *
                          ((100 - data.priceDetail.saleRatio) / 100)
                      )) ||
                      "0"}
                    đ
                  </h4>
                  {data.priceDetail && (
                    <del className="delete">{data.priceDetail.price}ss</del>
                  )}
                </div>
              </div>

              
            ))}
            

      <Pagination
        defaultCurrent={1}
        current={current}
        total={products?.length}
        onChange={(value) => setCurrent(value)}
      />

      </div>

    </>
  );
};

export default Product;
