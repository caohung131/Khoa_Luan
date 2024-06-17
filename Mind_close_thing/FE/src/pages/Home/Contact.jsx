import React from 'react';
import './ContactUs.css'; // Import the CSS file
import Header from './Header';
import Footer from './Footer';
import { Button } from 'antd';
import './Admin.css'

const ContactUs = () => {
  return (
   <>
    <Header/>
    <div className="contact-us-container">
      <h1>Liên Hệ Chúng Tôi</h1>
      <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ hãy gọi điện trực tiếp, hoặc gửi Mail form.</p>
      

      <div className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <p>Email: Caohung131@gmail.com</p>
        <p>Điện thoại: 097-456-0201</p>
        <p>Địa chỉ: 78 Phố Sủi, Gia Lâm, TP. Hà Nội</p>
      </div>

      <hr />
      <br />
      <br />
      
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
        <Button onClick={ e =>  {
           alert('Tính năng này đang được phát triển ')
        }} className='bg-blue color-white'>Gửi</Button>
      </form>


    </div>
    <Footer/>
   </>
  );
}

export default ContactUs;
