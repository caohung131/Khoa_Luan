const orderSchema = require("../order/validation");
const orderModel = require("../../models/Order.js");
const variantModel = require("../../models/Variant.js");
const productModel = require("../../models/Product.js");
const userModel = require("../../models/User.js");



const createOrder = async (req, res) => {
  const input = req.body;
  const userId = req.user;

  // return 0
  const userCart = await userModel
    .findById(userId) // Tìm theo id user
    .select("cart") // Chọn ra cart của user
    .populate("cart.cartDetail.variant"); // tham chiếu để đổ variant


  const validate = orderSchema.validate(input); // validate các dữ liệu nhập vào


  if (validate.error) {
    return res.status(400).json({ error: validate.error.message });
  }


  try {
    if (userCart.cart.cartDetail.length == 0) { // giỏ hàng rỗng
      return res.status(200).json({
        status: "ERR",
        message: "Không có sản phẩm trong giỏ hàng",
      });
    }

    //Th có trong giỏ hàng rồi
    for (let i = 0; i < userCart?.cart.cartDetail.length; i++) { // cho 1 vòng lặp tại card detail
      const variantId = userCart.cart.cartDetail[i].variant; // tìm id variant giỏ hàng detail
      const variant = await variantModel.findById(variantId);  // tìm trong bảng variant từ id đó

    console.log(userCart.cart.cartDetail); 


      if ( // cart trong kho >= số lượng đặt
        userCart.cart.cartDetail[i].variant?.countInStock >=
        userCart.cart.cartDetail[i]?.quantity
      ) {
        // console.log(variant.countInStock);
        variant.countInStock -= userCart.cart.cartDetail[i].quantity; // trừ số lượng từ giỏ hàng của variant đó
        console.log("variantCountInStock", variant.countInStock);
        const product = await productModel.findById(variant.productId);
        product.countInStock -= userCart?.cart?.cartDetail[i].quantity; // trừ số lượng của product 
        console.log("product.countInStock", product.countInStock);
        // Tính giá của order

        await variant.save();
        await product.save();
      } else {
        return res
          .status(400)
          .json({ message: "Kho không đủ số lượng trong giỏ hàng" });
      }
    }

    // tạo order
    const newOrder = await orderModel.create({
      orderedBy: userId,
      shippingAddress: input.shippingAddress,
      orderDetail: userCart.cart.cartDetail,
      paymentMethod: input.paymentMethod,
      status: input.status,
      totalPrice: userCart?.cart.totalPrice,
    });

    //gán lại giỏ hàng user bằng rỗng
    userCart.cart = {};
    await userCart.save();
    console.log(userCart);

    return res.status(201).json({
      order: newOrder,
      message: "Tao order thanh cong",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.findById(orderId)
    .populate("orderDetail")
    .populate('orderedBy')

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const updateStatusOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // return res.json({ orderId, status });
    if (!status || !orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId and status is required",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "update status thành công", order });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const deleteOrder = async (req, res) => {
  // check status nếu bằng = mới cho delete và kiểm tra hoàn tiền
};

const getPagingOrder = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 5;
    const pageIndex = req.query.pageIndex || 1;

    const orders = await orderModel
      .find({})
      .populate({ path: "orderedBy", select: "-password" })
      .populate("orderDetail.variant")
      .skip(pageSize * pageIndex - pageSize)
      .limit(pageSize);
    const count = orderModel.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    return res.status(200).json({ orders, count, totalPage });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({ path: "orderedBy", select: "-password" })
      .populate("orderDetail.variant");

    const count = orderModel.countDocuments();

    return res.status(200).json({ orders, count });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

// paypal


const createOrderPaymentPaypal = async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { _id } = req.user;
    const { orderDetail, totalPrice, shippingAddress } = req.body;
    // const { jsonResponse, httpStatusCode } = await createOrderPayPal(cart);
    const rs = await orderModel.create({
      orderDetail,
      totalPrice,
      orderBy: _id,
    });
    // res.status(httpStatusCode).json(jsonResponse);
    return res.json({
      success: userCart ? true : false,
      rs: userCart ? userCart : "something went wrong",
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};


const getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate({ path: "orderedBy", select: "-password" })
      .populate("orderDetail.variant");
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  updateStatusOrder,
  getOrderById,
  getPagingOrder,
  createOrderPaymentPaypal,
};
