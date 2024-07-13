import { useEffect, useState } from "react";

import { Button, Box, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { getProductDetails } from '../../redux/actions/productActions';


import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Flip, toast } from "react-toastify";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px 20px",
  border: "1px solid #f0f0f0",
  width: "95%",
});

const StyledButton = styled(Button)`
  width: 46%;
  border-radius: 2px;
  height: 50px;
  color: #fff;
`;

const ActionItem = () => {
  const navigate = useNavigate();


  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.getProductDetails);
  const { id } = product;

//   const cartDetails = useSelector(state => state.cart);
//   const { cartItems } = cartDetails;
//   const totalAmount = () => {
//     let price = 0, discount = 0;
//     cartItems.map(item => {
//         price += item.price.mrp
//         discount += (item.price.mrp - item.price.cost) 
//     })
// let totalPrice = price - discount;
// let deliveryCharge = 40;
// let lastPrice = totalPrice + deliveryCharge
// console.log(lastPrice);
// return lastPrice ;
// }



  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    toast.success("Item Added to Cart",{
        position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition:Flip,
      })
    navigate("/cart");
  };

//   const totalPrice =( product.price.mrp - product.price.discount) + 40 ;
//   console.log(totalPrice);
//   const checkoutHandler = async(amount)=>{
//     const {data:{key}}= await axios.get('http://localhost:8000/getkey')
//   const {data:{order}} = await axios.post("http://localhost:8000/api/checkout",{
//         amount
//     })
//     console.log(order.amount);
//     const options = {
//         key, // Enter the Key ID generated from the Dashboard
//         amount: order.amount,
//         currency: "INR",
//         name: 'Flipkart',
//         description: 'Flipkart Payment',
//         image: "../../../public/newflip.jpeg",
//         order_id: order.id, // Order ID 
//         // callback_url :'http://localhost:3000',
//         handler: function (response) {
//             // Handle payment success here
//             // console.log(response.razorpay_payment_id);
//             // console.log(response.razorpay_order_id);
//             // console.log(response.razorpay_signature);
//             setTimeout(() => {
//                 navigate("/")
//             },2000);
//             // Call your server to verify the payment and update the order status
//           },
        
//         prefill: {
//           name: '',
//           email: 'test10@example.com',
//           contact: '7016618382'
//         },
//         notes: {
//           address: 'Razorpay Corporate Office'
//         },
//         theme: {
//           color: '#F37254'
//         }
//       };

//     const razor = new window.Razorpay(options);
    
//         razor.open();
      
// }
  
  return (
    <LeftContainer>
      <Image src={product.detailUrl} />
      <br />
      <StyledButton
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </StyledButton>
      {/* <StyledButton
        onClick={()=>checkoutHandler(totalAmount())}
        style={{ background: "#fb641b" }}
        variant="contained"
      >
        <Flash /> Buy Now
      </StyledButton> */}
    </LeftContainer>
  );
};

export default ActionItem;
