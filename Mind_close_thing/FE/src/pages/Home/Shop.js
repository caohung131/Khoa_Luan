import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Shop.css";
import "./Admin.css"
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../../useContextData";
import { Breadcrumb, Pagination } from "antd";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {productData, dataSearch, categoryData} = useContext(DataContext)

  const [current, setCurrent] = useState(1);
  const pageSize = 18;

  useEffect(() => {
    // (dataSearch.length == 0) ? setProducts(productData?.products) : setProducts(dataSearch) 
    if(dataSearch.length == 0) {
      setProducts(productData.products)
    } else {
      setProducts(dataSearch) 
    }

    setCategories(categoryData)

  },[productData.products, dataSearch, categoryData])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/product")
  //     .then((response) => {
  //       setProducts(response.data.products);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  //     });
  // }, []);

  // console.log(selectedCategory)
  // console.log(categoryData)
  // console.log(categories)
  




  const formatNumber = (number) => {
    // console.log('number'+number)
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <Header />

     
      <section className="shop-content">
        <div className="sidebar">
          <h1><Link to="/">Mind Clothing Store</Link></h1>
          <li>
            <Link onClick={e => window.location.reload()}>Tất cả sản phẩm</Link>
          </li>
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                className={category.name === selectedCategory ? "active" : ""}
                onClick={() => handleCategoryClick(category.name)}
              >
                <li>{category.name}</li>
              </div>
            ))}
        </div>

        
        <div className="product">
          {products &&  //có product mới chạy
            products.filter((data) =>
                !selectedCategory || data?.category.name === selectedCategory //trả về category null hoặc trả về ten theo category
            )
            ?.slice((current - 1) * pageSize, current * pageSize) // phân trang
            .map((data) => (
              <div className="containerz" key={data.id}>
                <img src={data.thumbnail} alt="#"  className="with-anh"/>
                <Link to={`/detail/${data._id}`}>
                  {" "}
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
                    <del className="delete">{data.priceDetail.price}đ</del>
                  )}
                  {/* <span className="cart-icon">
                    <AiOutlineShoppingCart />
                  </span> */}
                </div>
              </div>
            ))}
             

             <div className="pagination-all "  style={{display:"flex", justifyContent:"end"} }> 
        <Pagination
        defaultCurrent={1}
        current={current}
        total={products?.length}
        onChange={(value) => setCurrent(value)}
      />
        </div>

        </div>

       
       
      </section>
   
      <Footer />
    </>
  );
};

export default Shop;
