import React from 'react';
import './StoreLocations.css'; // Import the CSS file
import Header from './Header';
import Footer from './Footer';

const StoreLocation = () => {
  const stores = [
    {
      name: "Cửa hàng 1",
      address: "123 Đường A, Quận 1, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.445799567872!2d106.7008873!3d10.7768897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292920c8a8b7%3A0x8e8f61905c7f4a90!2zMTIzIMSQxrDhu51uZyBBLCBRdeG6rW4gMSwgVFAuIEhvw6AgQ2jDrW5oIE1pbmg!5e0!3m2!1svi!2s!4v1650466443213!5m2!1svi!2s"
    },
    {
      name: "Cửa hàng 2",
      address: "456 Đường B, Quận 2, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7243121680147!2d106.724519!3d10.7906705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528dc9d3b4c61%3A0x4b5c4b0ed7fdb7f4!2zNDU2IMSQxrDhu51uZyBCLCBRdeG6rW4gMiwgVFAuIEhvw6AgQ2jDrW5oIE1pbmg!5e0!3m2!1svi!2s!4v1650466443213!5m2!1svi!2s"
    },
    {
      name: "Cửa hàng 3",
      address: "789 Đường C, Quận 3, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.607979858708!2d106.6958393!3d10.784234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b25a877af%3A0x4d5109c6d3022f4b!2zNzg5IMSQxrDhu51uZyBDLCBRdeG6rW4gMywgVFAuIEhvw6AgQ2jDrW5oIE1pbmg!5e0!3m2!1svi!2s!4v1650466443213!5m2!1svi!2s"
    }
  ];

  return (
    <>
      <Header/>
      <div className="store-locations-container">
      <h1>Hệ Thống Cửa Hàng</h1>
      <div className="store-list">
        {stores.map((store, index) => (
          <div className="store-item" key={index}>
            <h2>{store.name}</h2>
            <p>{store.address}</p>
            <div className="map-container">
              <iframe
                src={store.mapSrc}
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
        <Footer/>
    </>
  );
}

export default StoreLocation;
