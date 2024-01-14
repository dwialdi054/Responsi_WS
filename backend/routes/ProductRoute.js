import express from "express";
import {
    getProduct,
    getProductByid,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/products', getProduct);
router.get('/products/:id', getProductByid);
router.post('/products', saveProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;