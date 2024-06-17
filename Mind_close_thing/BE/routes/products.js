const router = require("express").Router();
const {
  createProduct,
  createCategory,
  getProductById,
  getAllProductPaging,
  deleteProduct,
  getProductByCategory,
  updateProduct,
  getAllProduct,
  UploadImagesProduct,

cc,

getAllCategory} = require("../controllers/product");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

const uploader = require("../cloudinary/cloudinary.config.js")

// var multer = require('multer');
// var upload = multer({ dest: 'public/uploads' });

// const {handleUpload} = require("../controllers/server.js")


// GET
router.get("/", getAllProduct);

router.get("/get-all-paging", getAllProductPaging);
router.get("/get-by-category", getProductByCategory);
//category
router.get("/getCategoryAll", getAllCategory);
router.post("/createCategory",createCategory);

router.get("/:id", getProductById);
//POST
router.post("/:id", authentication, authorization,createProduct);
// PUT
router.put("/:id",authentication,authorization, updateProduct);

// DELETE
router.delete("/:id",authentication,authorization, deleteProduct);

//upload file
// Cấu hình multer
// router.put("/upload/anh", uploader.single('image') ,UploadImagesProduct);
router.post("/upload/anh",uploader.single("image"), UploadImagesProduct);





// router.get("/searchName", (req,res) => {
//   try {
//     const body= req.params;
//     console.log(body)
//   } catch (error) {
//     error.message = "lỗi"
//   }
// });

module.exports = router;
