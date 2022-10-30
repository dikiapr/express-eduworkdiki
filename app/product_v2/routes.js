const router = require("express").Router();
const productControllerv2 = require("./controller_v2");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

router.get("/product", productControllerv2.index);
router.get("/product/:id", productControllerv2.view);
router.post("/product/", upload.single("image"), productControllerv2.store);
router.put("/product/:id", upload.single("image"), productControllerv2.update);
router.delete("/product/:id", upload.single("image"), productControllerv2.destroy);

module.exports = router;
