import React from 'react';
import './ContactUs.css'; // Import the CSS file
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  return (
   <>
    <Header/>
    <div className="contact-us-container">
      <h1>Liên Hệ Chúng Tôi</h1>
      <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua biểu mẫu dưới đây hoặc qua thông tin liên hệ bên dưới.</p>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Tin nhắn</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className='btn-Contact' onClick={e => {
          alert('Tính năng này đang được phát triển ')
        }}>Gửi</button>
      </form>

      <div className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <p>Email: support@example.com</p>
        <p>Điện thoại: 0123-456-789</p>
        <p>Địa chỉ: 123 Đường A, Quận 1, TP. Hồ Chí Minh</p>
      </div>
    </div>
    <Footer/>
   </>
  );
}

export default ContactUs;
