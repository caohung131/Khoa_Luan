// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { createApiPjc } from "./services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = async () => {
    try {
      const a = !!localStorage.getItem("user"); // chuyển về boolean 
      // console.log(a);
      const response = await createApiPjc().get(              //1.Tạo api get user hiện tại
        "http://localhost:8000/user/get-current"
      );
      if (response.data.success) { //2. nếu tạo thành công thì set user và stase, và sẻ trạng thái login = true
        setUser(response.data.rs);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token); // Chuyển đổi thành boolean để kiểm tra đăng nhập
    if (token) {
      updateUser();
    }
  }, []); // Gọi một lần khi component mount và logic đăng nhập thay đổi

  return (
    <UserContext.Provider value={{ setUser, isLoggedIn, updateUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
