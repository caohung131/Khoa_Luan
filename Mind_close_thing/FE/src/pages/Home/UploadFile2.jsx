import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);


    try {
      const response = await axios.get('http://localhost:8000/product/upload/anh', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage(response.data);
    } catch (error) {
      console.error('Error uploading file: ', error);
      setUploadMessage('Đã xảy ra lỗi khi tải lên tệp.');
    }
  };

  return (
    <div>
      <h1>Tải lên tệp</h1>
      <input type="file" onChange={handleFileChange} name='image' />
      <button onClick={handleUpload}>Tải lên</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default App;
