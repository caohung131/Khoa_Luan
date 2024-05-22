import React, { createContext, useState, useEffect } from 'react';
import { createApiPjc } from './services';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    // useEffect(async () => {
    //     await createApiPjc()
    //         .get("http://localhost:8000/user")
    //         .then((response) => setUserData(response.data.user))
    //         .catch((error) => console.error("Error:", error));
    // }, []);

    console.log(userData);

    useEffect(() => {
        fetch("http://localhost:8000/user")
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //product Api
    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8000/product')
            .then(response => response.json())
            .then(data => setProductData(data))
            .catch(error => console.error('Error fetching data:', error));

        // await createApiPjc().get('http://localhost:8000/product')
        // .then(data => setProductData(data))
        // .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Order Api
    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8000/order/all')
            .then(response => response.json())
            .then(data => setOrderData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //category Apis
    useEffect(() => {
        axios
            .get("http://localhost:8000/category")
            .then((response) => {
                console.log(response)
                // console.log(response.data.products)

                setCategoryData(response.data.categories);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            });
    }, []);

    return (
        <DataContext.Provider value={{
            productData, setOrderData, setProductData, orderData, dataSearch, setDataSearch, categoryData, setCategoryData
            , userData, setUserData, selectedCategory, setSelectedCategory
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };