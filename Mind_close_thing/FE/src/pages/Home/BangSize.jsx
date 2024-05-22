import React from 'react';
import './SizeChart.css'; // Import the CSS file
import Header from './Header';
import Footer from './Footer';

const SizeChart = () => {
  const sizeCharts = [
    {
      category: "Áo Thun",
      sizes: [
        { size: "S", chest: "86-91 cm", waist: "71-76 cm" },
        { size: "M", chest: "91-97 cm", waist: "76-81 cm" },
        { size: "L", chest: "97-102 cm", waist: "81-86 cm" },
        { size: "XL", chest: "102-107 cm", waist: "86-91 cm" },
      ]
    },
    {
      category: "Quần Jean",
      sizes: [
        { size: "28", waist: "71 cm", hip: "86 cm" },
        { size: "30", waist: "76 cm", hip: "91 cm" },
        { size: "32", waist: "81 cm", hip: "96 cm" },
        { size: "34", waist: "86 cm", hip: "101 cm" },
      ]
    },
    {
      category: "Giày Dép",
      sizes: [
        { size: "38", footLength: "24.5 cm" },
        { size: "39", footLength: "25.0 cm" },
        { size: "40", footLength: "25.5 cm" },
        { size: "41", footLength: "26.0 cm" },
      ]
    }
  ];

  return (
    <>
        <Header/>
        <div className="size-chart-container">
      <h1>Bảng Size</h1>
      {sizeCharts.map((chart, index) => (
        <div key={index} className="size-chart">
          <h2>{chart.category}</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(chart.sizes[0]).map((key, index) => (
                  <th key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.sizes.map((size, index) => (
                <tr key={index}>
                  {Object.values(size).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
        <Footer/>
    </>
  );
}

export default SizeChart;
