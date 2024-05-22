import React from 'react';
import "./ReturnPolicy.css"
// import "./Admin.css"
import Header from './Header';
import Footer from './Footer';

const ReturnPolicy = () => {
  return (
    <>
    <Header/>
    <div className="return-policy-container">
      <h1>Chính Sách Đổi Trả</h1>
      <p>Chúng tôi cam kết mang đến sự hài lòng cho khách hàng với chính sách đổi trả linh hoạt và thuận tiện. Nếu bạn không hài lòng với sản phẩm đã mua, bạn có thể đổi trả theo các điều kiện dưới đây:</p>
      
      <h2>Điều Kiện Đổi Trả</h2>
      <ul>
        <li>Sản phẩm phải được đổi trả trong vòng 30 ngày kể từ ngày nhận hàng.</li>
        <li>Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và còn nguyên bao bì.</li>
        <li>Hóa đơn mua hàng hoặc bằng chứng mua hàng phải được xuất trình khi đổi trả.</li>
      </ul>
      
      <h2>Quy Trình Đổi Trả</h2>
      <ol>
        <li>Liên hệ với dịch vụ khách hàng của chúng tôi qua email hoặc số điện thoại để yêu cầu đổi trả.</li>
        <li>Gửi sản phẩm về địa chỉ của chúng tôi cùng với hóa đơn mua hàng hoặc bằng chứng mua hàng.</li>
        <li>Chúng tôi sẽ kiểm tra sản phẩm và tiến hành đổi trả hoặc hoàn tiền trong vòng 7 ngày làm việc kể từ khi nhận được sản phẩm.</li>
      </ol>
      
      <h2>Phí Đổi Trả</h2>
      <p>Phí vận chuyển cho việc đổi trả sẽ do khách hàng chi trả, trừ khi sản phẩm bị lỗi hoặc không đúng với đơn đặt hàng.</p>
      
      <h2>Liên Hệ</h2>
      <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách đổi trả của chúng tôi, vui lòng liên hệ:</p>
      <ul>
        <li>Email: Mindclosething@gmail.com</li>
        <li>Điện thoại: 0123-456-789</li>
      </ul>
    </div>
    <Footer/>
    </>
  );
}

export default ReturnPolicy;