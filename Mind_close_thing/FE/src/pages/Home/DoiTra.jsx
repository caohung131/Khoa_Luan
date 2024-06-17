import React from 'react';
import "./ReturnPolicy.css"
// import "./Admin.css"
import Header from './Header';
import Footer from './Footer';

const ReturnPolicy = () => {
  return (
    <>
    <Header/>
    <div className="container">
      <br/>
      <br/>
          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
          1. CHÍNH SÁCH ĐỔI SẢN PHẨM
        </div>

        <br/>
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>a. Đổi size</div>
        <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '5px' }}>
            Áp dụng 01 lần đổi /1 đơn hàng với các đơn hàng mua online và các đơn hàng mua tại cửa hàng.
          </li>
          <li style={{ marginBottom: '5px' }}>
            Sản phẩm đổi trong thời gian 3 ngày kể từ ngày mua hàng trên hoá đơn (đối với khách mua hàng trực tiếp tại cửa hàng), 3 ngày kể từ ngày nhận hàng (Đối với khách mua online)
          </li>
          <li style={{ marginBottom: '5px' }}>
            Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.
          </li>
          <li style={{ marginBottom: '5px' }}>Không áp dụng đối với các sản phẩm là phụ kiện</li>
        </ul>

        <br/>
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>b. Đổi sản phẩm lỗi</div>
        <div style={{ marginBottom: '10px', paddingLeft: '20px' }}>
          <div style={{ marginBottom: '5px' }}>Điều kiện áp dụng</div>
          <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Sản phẩm lỗi kỹ thuật: Sản phẩm rách, bung keo, …</li>
          </ul>
          <div style={{ marginBottom: '5px' }}>Trường hợp không được giải quyết</div>
          <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Sản phẩm đã qua sử dụng</li>
          </ul>
          <p style={{ marginBottom: '5px' }}>
            Đối với sản phẩm lỗi kỹ thuật cần phản hồi đến Mind Clothing trong vòng 3 ngày, kể từ ngày mua hàng trên hoá đơn đối với khách mua trực tiếp tại cửa hàng, 3 ngày kể từ ngày nhận hàng đối với khách mua online.
          </p>
        </div>
      </div>

      <br/>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>2. PHƯƠNG THỨC ĐỔI SẢN PHẨM</div>
        <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '5px' }}>Hàng mua trực tiếp tại cửa hàng: Đổi trả trực tiếp tại cửa hàng mua hàng</li>
          <li style={{ marginBottom: '5px' }}>Hàng mua online (thông qua website, Shopee, Lazada): liên hệ fanpage Mind Clothing   để được hướng dẫn đổi trả</li>
        </ul>
      </div>

      <br/>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>3. CHI PHÍ ĐỔI HÀNG</div>
        <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '5px' }}>Miễn phí đổi hàng cho khách mua ở Mind Clothing trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</li>
          <li style={{ marginBottom: '5px' }}>Trong trường hợp không vừa size hay khách hàng không ưng sản phẩm không muốn nhận hàng phiền khách hàng trả ship hoàn đơn hàng về.</li>
        </ul>
      </div>
    </div>

    <br/>

    </div>
    <Footer/>
    </>
  );
}

export default ReturnPolicy;