const { getAllCategory, createCategory, deleteCategory, getCategoryId,updateCategory } = require("../controllers/product");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get('/', getAllCategory)
router.get('/:id', getCategoryId)
// router.post("/create-category",authentication,authorization, createCategory);
router.put("/:id",authentication,authorization, updateCategory);
router.delete('/:id',authentication, authorization, deleteCategory);
module.exports = router;