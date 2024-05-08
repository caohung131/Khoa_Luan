import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../../useContextData";

const Product = () => {

  const [products, setProducts] = useState([]) 
  const {productData, dataSearch} = useContext(DataContext)

  // console.log(dataProduct?.productData?.products)
  // console.log(dataSearch)

  useEffect(() => {
    // (dataSearch.length == 0) ? setProducts(productData?.products) : setProducts(dataSearch) 
    if(dataSearch.length == 0) {
      setProducts(productData.products)
    } else {
      setProducts(dataSearch) 
    }

  },[productData.products, dataSearch])

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
        {products?.map((data) => (
          <div
            className="w-[] p-2.5 m-2.5 text-center border border-[#ddd] rounded-lg"
            key={data.id}
          >
            <Link to={`/detail/${data._id}`}>
              <img src={data.thumbnail} alt="#" />
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
      </div>
    </>
  );
};

export default Product;
