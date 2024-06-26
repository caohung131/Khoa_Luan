import React, { useEffect, useState } from "react";
import DetailsInfo from "../components/detailProducts/Detail_Cart_Info";
import SlideImg from "../components/detailProducts/SlideImg";
import Decribe from "../components/detailProducts/Decribe";
import "./Detail.css";
import axios from "axios";
import SimilarProducts from "../components/detailProducts/SimilarProducts";
import { useParams } from "react-router-dom";
import Headers from "./Header";
import Footer from "./Footer";

const Detail = () => {
  const [productById, setProductById] = useState();
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${id}`)
      .then((response) => setProductById(response.data.product))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  return (
    <>
      <Headers />
      <div className="container flex flex-col lg:flex-row items-start ">
        {productById && <SlideImg productById={productById} />}
        {productById && <DetailsInfo productById={productById} />}
      </div>
      <div>
        {productById && <Decribe productById={productById} />}
        <SimilarProducts />
      </div>
      <Footer />
    </>
  );
};

export default Detail;
