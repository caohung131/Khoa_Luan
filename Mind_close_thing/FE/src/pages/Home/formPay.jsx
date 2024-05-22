import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./Admin.css";
import { useUser } from "../../UserContext";
import { createApiPjc } from "../../services";

const PaymentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, updateUser } = useUser();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePay = async () => {
    // console.log(cartDetails)

    try {
      const result = await createApiPjc().post(
        `http://localhost:8000/order/${user._id}`,
        {
          orderedBy: user._id,
          // orderDetail: transformData(cartDetails),
          shippingAddress: user.shippingAddress,
        }
      );
      console.log(result);
      // message.success("Thanh toán thành công")
      alert("Thanh toán thành công");
      window.location.reload();
    } catch (error) {
      alert("Thanh toán thất bại");
    }
    // alert('a')
  };

  const update = () => {
    alert('Tính năng này đang được phát triển');
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "10px", width: "100%" }}
        className="bg-black w-full lg:w-[300px] mt-3 !rounded-none"
        size="large"
      >
        Thanh toán
      </Button>
      <Modal
        title="Phương Thức Thanh Toán"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="default"
            size="large"
            style={{ marginBottom: "12px", width: "100%", marginTop: "20px" }}
            className="bg-blue color-white"
            onClick={update}
          >
            Chuyển khoản Ngân Hàng
          </Button>
          <Button
            type="default"
            size="large"
            style={{ marginBottom: "12px", width: "100%" }}
            className="bg-red color-white"
            onClick={update}

          >
            Pay with Momo
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: "12px", width: "100%" }}
            className="bg-orange"
            onClick={update}

          >
            Pay with Bitcoin
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: "30px", width: "100%" }}
            className="bg-blue"
            onClick={handlePay}
          >
            Thanh toán khi nhận hàng
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentModal;
