import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { paymentCtrl, paymentVerification } from '../controller/payment-controller.js';



const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post("/api/checkout",paymentCtrl)
router.post("/api/paymentverification",paymentVerification)
// router.post('/cart/add', addItemInCart);



export default router;