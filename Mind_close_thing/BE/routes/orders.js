const router = require("express").Router();
const {
  createOrder,
  updateStatusOrder,
  getOrderById,
  createOrderPaymentPaypal,
  getAllOrder,
  getPagingOrder,
} = require("../controllers/order/index");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

// router.post("/create-order",authentication, createOrder);
router.put("/update-status-order/:id", updateStatusOrder);
// router.post("/payment",authentication, createOrderPaymentPaypal);
router.post("/:id", authentication, createOrder);
// thêm router updateOrder (check đk status = 0)
// thêm router deleteOrder (check đk status = 0)
router.get("/all",authentication,authorization, getAllOrder);
router.get("/:id", getOrderById);


// thêm router listOrderById (admin)
// thêm router getAllOrder  (admin)
router.put("/:id",authentication,authorization, updateStatusOrder);

module.exports = router;
