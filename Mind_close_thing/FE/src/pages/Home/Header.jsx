import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { getQuantityInCart } from "../../helper";
import CartDropdown from "./CartDropdown";
import "./Home.css";
import { DataContext } from "../../useContextData";
import axios from "axios";

const Header = () => {
  const {
    productData,
    setProductData,
    setDataSearch,
    categoryData,
    setSelectedCategory,
    selectedCategory,
  } = useContext(DataContext);

  const [handleModal, setHandleModal] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [login, setLogin] = useState(true);

  //Login

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const [userNameRegister, setUserNameRegister] = useState("");
  // const [passwordRegister, setPasswordRegister] = useState("");
  // const [checkPasswordRegister, setCheckPasswordRegister] = useState("");

  const [newProduct, setNewProduct] = useState(productData.products);
  const [categories, setCategories] = useState([]);

  // console.log(newProduct);

  useEffect(() => {
    setCategories(categoryData);
  }, [categoryData]);

  const navigate = new useNavigate();
  const form = useRef();
  const name = JSON?.parse(localStorage?.getItem("user"));
  const handleOnclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    setUser(null);
    navigate("/");
  };

  const { updateUser, user: userData, setUser } = useUser();
  const totalQuantityInCart = getQuantityInCart(userData?.cart?.cartDetail);

  const handleLogin = async () => {
    await fetch("http://localhost:8000/user/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email: userName, password }), // body data type must match "Content-Type" header
    }).then((res) =>
      res.json().then((data) => {
        if (data.email === userName) {
          // console.log("2222"+data)
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("id", data.id);
          setHandleModal(!handleModal);
          navigate("/");
          message.success("Đăng nhập thành công!");
        } else {
          message.error("Tài khoản hoặc mật khẩu sai!");
        }
      })
    );
    updateUser();
  };

  const handleAddUser = async (values) => {
    try {
      // Kiểm tra mật khẩu có trùng khớp không
      if (values.password !== values.passwordRepeat) {
        alert("Mật khẩu không trùng khớp!");
        return;
      }

      // Kiểm tra định dạng mật khẩu Abc1@ >8 kí tự
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(values.password)) {
        alert(
          "Mật khẩu không đủ mạnh! Mật khẩu cần chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt."
        );
        return;
      }

      const user = await axios.get("http://localhost:8000/user");

      // console.log(user.data.user)

      // Kiểm tra xem email đã tồn tại
      const existingUser = user?.data?.user.find(
        (user) => user.email === values.username
      );
      if (existingUser) {
        alert("Tài khoản Email đã tồn tại!");
        return;
      }

      // Call api
      const response = await axios.post("http://localhost:8000/user/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        birth_year: values.birth_year,
        shippingAddress: {
          address: values.address,
          district: values.district,
          city: values.city,
        },
      });

      if (!response.status === 200) {
        throw new Error("Đã có lỗi xảy ra khi gửi yêu cầu.");
      }

      // Nếu không có lỗi và không tồn tại email trong cơ sở dữ liệu
      setHandleModal(!handleModal);
      alert("Bạn đã đăng ký tài khoản thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Đăng ký thất bại, vui lòng kiểm tra lại thông tin!");
    }
  };

  //search
  const handleSearch = () => {
    // console.log(document.querySelector("#search_user").value);
    const searchEle = document.querySelector("#search_user");
    const newData = productData?.products.filter((item) => {
      return item?.name.toUpperCase().includes(searchEle?.value.toUpperCase());
      // console.log(item.name)
    });
    console.log(newData);
    setDataSearch(newData);
  };

  // console.log(dataSearch)

  //setSelected
  const handleCategoryClick = (categoryName) => {
    // console.log(categoryName);
    setSelectedCategory(categoryName);
  };

  // console.log(selectedCategory);

  return (
    <>
      <div>
        <div className="bg-[#f5f5f5] py-2.5">
          <div className="container hidden lg:block">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="p-2.5 w-[250px] border border-[#3c3c3]"
                id="search_user"
                onChange={handleSearch}
              />
              <div
                className="cursor-pointer  bg-[#545457] text-white px-3 py-2.5  rounded-sm"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-magnifying-glass" />
              </div>
              <ul>
                {name ? (
                  <>
                    {" "}
                    <li>
                      <Link to="/profile">
                        <a style={{ color: "black" }}>
                          <i className="fa-regular fa-user"></i>
                          {` ${name?.email?.split("@")[0]}`}
                        </a>
                      </Link>{" "}
                      <a href="/" onClick={handleOnclick}>
                        ĐĂNG XUẤT
                      </a>
                    </li>{" "}
                  </>
                ) : (
                  <li>
                    <a
                      className="login-header-hover cursor-pointer ml-4"
                      onClick={() => setHandleModal(!handleModal)}
                    >
                      ĐĂNG NHẬP
                    </a>
                  </li>
                )}
              </ul>
              <div className="cart-nativator relative group">
                <Link to="/cart">
                  <Badge count={totalQuantityInCart} showZero>
                    <ShoppingCartOutlined className="text-[40px] ml-5 text-red-500 cursor-pointer" />
                  </Badge>
                </Link>
                <div className="cart-dropdown hidden absolute right-0 z-50 group-hover:block">
                  <CartDropdown />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex lg:hidden justify-between container">
              <MenuOutlined
                className="text-[20px]"
                onClick={() => setMenuMobile(true)}
              />

              <Link to="/">
                <p className="text-3xl">Mind Clothing Store</p>
              </Link>

              <div className="flex items-center gap-3">
                <div className="cursor-pointer text-[#999] text-[20px]">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <Link to="/cart">
                  <Badge count={totalQuantityInCart} showZero>
                    <ShoppingCartOutlined className="text-[30px] text-red-500 cursor-pointer" />
                  </Badge>
                </Link>
              </div>
            </div>
          </div>

          <Drawer
            title="Menu"
            placement={"left"}
            closable={false}
            onClose={() => {
              setMenuMobile(false);
            }}
            open={menuMobile}
          >
            <ul className="">
              <li className="cursor-pointer list-disc">
                <Link to="/">TRANG CHỦ</Link>
              </li>

              <li className="list-disc">
                <Link to="/shop">Tất cả sản phẩm</Link>
              </li>

              <div className="ml-4"></div>
              <li className="cursor-pointer list-disc">
                <Link to="/doitra">CHÍNH SÁCH ĐỔI TRẢ</Link>
              </li>

              <li className="cursor-pointer list-disc">
                <a href="eee">BẢNG SIZE</a>
              </li>
              <li className="cursor-pointer list-disc">
                <a href>HỆ THỐNG CỦA HÀNG</a>
              </li>
            </ul>
          </Drawer>
        </div>

        <header className="container hidden lg:block">
          <ul className="flex container items-center justify-between pt-6 text-lg px-24">
            <li className="cursor-pointer">
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li className="cursor-pointer">
              {/* <a href>CHÍNH SÁCH ĐỔI TRẢ</a> */}
              <Link to="/doitra">CHÍNH SÁCH ĐỔI TRẢ</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/">
                <p className="text-3xl">Mind Clothing Store</p>
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/bangsize">BẢNG SIZE</Link>

            </li>
            <li className="cursor-pointer">
              <Link to="/vitri">HỆ THỐNG CỦA HÀNG</Link>
            </li>
          </ul>
          <Divider />
          <ul className="flex container justify-between items-center px-40 text-base mb-4">
            <li>
              <Link to="/shop">Tất cả sản phẩm</Link>
            </li>

            <li>
              <Link to="/lienhe">Liên hệ</Link>
            </li>
            <li>
              <Link to="/order-user">Kiểm tra đơn hàng</Link>
            </li>

            {/* 
            {categories &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className={category.name === selectedCategory ? "active" : ""}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <li>{category.name}</li>
                </div>
              ))} */}
          </ul>
        </header>
      </div>
      <Modal
        open={handleModal}
        handleModal={handleModal}
        footer={null}
        width={550}
        onCancel={() => {
          setLogin(true);
          setHandleModal(false);
        }}
      >
        {login ? (
          <div>
            <div className="max-w-[500px] mx-auto">
              <h1
                className="text-3xl font-bold"
                style={{ marginBottom: "10px" }}
              >
                Đăng nhập
              </h1>

              <p>Vui lòng nhập thông tin tài khoản</p>
              <hr />
              <label htmlFor="username" className="mt-2">
                <b>Tên đăng nhập</b>
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
                }}
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                placeholder="Mời nhập tên tài khoản"
                name="username"
                id="username"
              />

              <label htmlFor="password">
                <b>Mật khẩu</b>
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
                }}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="******"
                name="password"
                id="password"
              />

              <hr />
              <Button
                type="primary"
                onClick={handleLogin}
                htmlType="submit"
                className="bg-green-500 w-full "
                size="large"
              >
                Đăng nhập
              </Button>
            </div>
            <p className="text-base mt-1">
              Bạn chưa có tài khoản?{" "}
              <Link className="text-blue-500" onClick={() => setLogin(!login)}>
                Đăng ký
              </Link>
            </p>
          </div>
        ) : (
          <div style={{ margin: "0 auto" }}>
            <Form onFinish={handleAddUser}>
              <div className="register" style={{}}>
                <h1 className="text-3xl font-bold">Đăng ký</h1>
                <p style={{ marginBottom: 10 }}>
                  Vui lòng điền thông tin để đăng ký
                </p>
                <hr />

                <Form.Item
                  label="Tên đăng nhập Email: "
                  name="email"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên tài khoản!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập tên tài khoản"
                  />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ width: "100%" }}
                    placeholder="******"
                  />
                </Form.Item>

                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="passwordRepeat"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lại mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ width: "100%" }}
                    placeholder="******"
                  />
                </Form.Item>

                <Form.Item
                  label="Tên của bạn:"
                  name="username"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên tài khoản!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập tên của bạn"
                  />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại: "
                  name="phone"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập tên của bạn"
                  />
                </Form.Item>

                <Form.Item
                  label="Năm sinh: "
                  name="birth_year"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Mời nhập tên của bạn"
                  />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ Address!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập Address"
                  />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ City!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập City"
                  />
                </Form.Item>

                <Form.Item
                  label="District"
                  name="district"
                  labelCol={{ span: 8 }} // Đặt kích thước của nhãn là 8 cột (tương ứng với 8/24)
                  wrapperCol={{ span: 16 }} // Đặt kích thước của input là 16 cột (tương ứng với 16/24)
                  style={{ marginTop: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ District!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Mời nhập Address"
                  />
                </Form.Item>

                <hr />
                <p className="mt-1 text-sm">
                  Để tạo tài khoản vui lòng đồng ý với điều khoản của chúng tôi{" "}
                  <Link className="text-blue-500">Terms &amp; Privacy</Link>.
                </p>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-green-500 w-full"
                    size="large"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
              </div>
            </Form>

            <p className="mt-1 text-sm">
              Bạn đã có tài khoản rồi?{" "}
              <Link
                className="text-blue-500"
                style={{ cursor: "pointer" }}
                onClick={() => setLogin(!login)}
              >
                Đăng nhập
              </Link>
              .
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Header;
