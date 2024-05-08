import React, { useEffect, useState } from "react";
import Headers from "./Header";
import Footer from "./Footer";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
import { formatCurrencyInVnd } from "../../helper";
import { useUser } from "../../UserContext";
import emptyCartSvg from "../../assets/images/cart_empty.svg";
import axios, { AxiosError } from "axios";
import CartDropdown from "./CartDropdown";
import { createApiPjc } from "../../services";

export default function Cart() {
  const { user, updateUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const cartDetails = user?.cart?.cartDetail || [];
  const totalPrice = user?.cart?.totalPrice || 0;

  // console.log(user)
  // console.log(user.cart.cartDetail)


  //kt giỏ về cũ
  // try {
    

  //   cartDetails.map(async (item) => {
  //     // console.log(item.variant)
      
  //     let variant = await createApiPjc().get(
  //       `http://localhost:8000/variant/${item.variant}`
  //     )

  //     console.log(variant.data.variant)
  //     console.log(variant.data.variant.countInStock)
  //     let countInStock = variant.data.variant.countInStock

  //     console.log(item.quantity)
  //     console.log(countInStock)

  //     // if(item.quantity > variant.data.variant.countInStock) {
  //     //   const response = await createApiPjc().put(
  //     //     "http://localhost:8000/user/cart",
  //     //     {
  //     //       quantity: countInStock,
  //     //     },
         
  //     //   );
  //     //   console.log(response.data)
  //     // }


  //   })
  // } catch (error) {
  //   console.log(error.message)
  // }
  //

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };

  const handlePay = async () => {
    // console.log(cartDetails)

    const result = await createApiPjc().post(
      `http://localhost:8000/order/${user._id}`,
      {
        // orderedBy: user._id,
        orderDetail: transformData(cartDetails),
        shippingAddress: user.shippingAddress
      }

    )
    console.log(result)
    // message.success("Thanh toán thành công")
    alert("Thanh toán thành công")
    window.location.reload()
   
    // alert('a')
  };

  const changeQuantity = async (variantId, quantity) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:8000/user/cart",
        {
          variant: variantId,
          quantity,
          action: "changeQuantity",
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.data?.success) {
        updateUser();
      } else {
        throw new Error(response?.message || "Cập nhật giỏ hàng thất bại");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(error.response.data?.message || "Cập nhật giỏ hàng thất bại");
      } else {
        message.error(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeQuantity = (type, cartItem, inputQuantity) => {
    let newQuantity = cartItem.quantity;

    if (type === "increase") {
      newQuantity += 1;
    }
    if (type === "decrease") {
      newQuantity -= 1;
    }
    if (type === "update") {
      newQuantity = inputQuantity;
    }

    if (newQuantity <= 0) {
      hanelRemoveCartItem(cartItem);
    } else {
      changeQuantity(cartItem.variant, newQuantity);
    }

  };

  const hanelRemoveCartItem = async cartItem => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:8000/user/remove-cart/${cartItem.variant}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.data?.success) {
        updateUser();
      } else {
        message.error("Xoá không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API addVariantToCart:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Headers />
      <section className="min-h-[57vh]">
        <div className="mb-10 container text-[#333]">
          <h1 className="text-2xl text-left mt-1">Giỏ hàng của bạn</h1>

          <div className="relative overflow-x-auto mt-2 hidden md:block">
            {cartDetails.length > 0 ? (
              <>
                <table className="w-full text-left">
                  <thead className="text-base font-bold text-[#333333] bg-white border border-[#ebebeb] ">
                    <tr className="py-2">
                      <th scope="col" className="pl-[10px]">
                        Thông tin sản phẩm
                      </th>
                      <th scope="col" className="text-center">
                        Đơn giá
                      </th>
                      <th scope="col" className="text-center">
                        Số lượng
                      </th>
                      <th scope="col" className="text-center">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails.map(cartItem => {
                      const priceAProduct =
                        cartItem?.priceDetail?.price * ((100 - cartItem?.priceDetail?.saleRatio) / 100);

                      return (
                        <tr
                          className="bg-white border border-[#ebebeb] hover:bg-gray-50"
                          key={cartItem?.variant}
                        >
                          <th scope="row" className="pl-[10px] py-2">
                            <div className="d-flex flex-row gap-3">
                              <img
                                src={cartItem?.image}
                                alt={cartItem?.name}
                                className=" w-[79px] xl:w-[110px]"
                              />
                              <div className="d-flex flex-col justify-center gap-2">
                                <Link
                                  to={`/detail/${cartItem?.productId}`}
                                  title={cartItem?.name}
                                  className="text-sm font-medium text-[#333333] hover:text-[#999999]"
                                >
                                  {cartItem?.name}
                                </Link>
                                <span className="text-xs text-[#333333] font-medium">
                                  {cartItem?.color} / {cartItem?.size}
                                </span>
                                <div className="action-remove">
                                  <button
                                    className="font-light text-[#ff0000] text-[13px] inline"
                                    onClick={() => hanelRemoveCartItem(cartItem)}
                                  >
                                    Xoá
                                  </button>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td className="text-center py-2 text-[#ff0000] font-bold text-sm">
                            {formatCurrencyInVnd(priceAProduct)}đ
                          </td>
                          <td className="text-center py-2">
                            <div className="flex justify-center text-sm">
                              <button
                                type="button"
                                className={`rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7 leading-6 text-lg ${isLoading ? "pointer-events-none" : ""}`}
                                onClick={() => handleChangeQuantity("decrease", cartItem)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className={`rounded-none border-[#e5e5e5] p-0 m-0 w-9 h-7 text-center border-t border-b ${isLoading ? "pointer-events-none" : ""}`}
                                maxlength="2"
                                pattern="[0-9]*"
                                value={cartItem.quantity}
                                onChange={event =>
                                  handleChangeQuantity("update", cartItem, event.target.value)
                                }
                              />
                              <button
                                className={`rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7 leading-6 text-lg ${isLoading ? "pointer-events-none" : ""}`}
                                onClick={() => handleChangeQuantity("increase", cartItem)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center py-2 text-[#ff0000] font-bold text-sm">
                            {formatCurrencyInVnd(priceAProduct * cartItem.quantity)}đ
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex mt-4 justify-between xl:justify-end xl:gap-2 items-center">
                  <p className="text-base ">Tổng tiền:</p>
                  <p className="font-bold text-base text-[#ff0000]">
                    {formatCurrencyInVnd(totalPrice)}đ
                  </p>
                </div>
                <div className="lg:flex lg:justify-end" >
                  <Button onClick={handlePay}
                    type="primary"
                    className="bg-black w-full lg:w-[300px] mt-3 !rounded-none"
                    size="large"
                  >
                    Thanh toán
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center gap-3">
                <img src={emptyCartSvg} alt="empty cart" className="w-24 h-24" />
                <span>Không có sản phẩm nào trong giỏ hàng của bạn</span>
              </div>
            )}
          </div>

          <div className="block md:hidden mt-2">
            <CartDropdown />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
