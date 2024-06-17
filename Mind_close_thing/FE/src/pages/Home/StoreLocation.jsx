import React from 'react';
import './StoreLocations.css'; // Import the CSS file
import Header from './Header';
import Footer from './Footer';

const StoreLocation = () => {
  const stores = [
    {
      name: "Cửa hàng 1",
      address: "123 Đường A, Quận 1, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6995260776007!2d105.86202878052201!3d21.04470543060925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abaec3da53f7%3A0xdce549b3c6ddf94!2zMjIgUC4gTG9uZyBCacOqbiAyLCBOZ-G7jWMgTMOibSwgTG9uZyBCacOqbiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1717782073250!5m2!1svi!2sus"
    },
    {
      name: "Cửa hàng 2",
      address: "456 Đường B, Quận 2, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29799.952592031157!2d105.79945739717348!3d20.992874662171722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adcfd29a8911%3A0xc88c52b4351b634d!2zS2hvw6EgY-G7rWEgdsOibiB0YXk!5e0!3m2!1svi!2sus!4v1717781910510!5m2!1svi!2sus" 
    },
    {
      name: "Cửa hàng 3",
      address: "789 Đường C, Quận 3, TP. Hồ Chí Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.522903768051!2d105.95249567522218!3d21.011753380633326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a8ba54508047%3A0xca72e5f025ab12cb!2zNzggU-G7p2ksIFRyw6J1IFF14buzLCBHaWEgTMOibSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1717780502762!5m2!1svi!2sus" 
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
