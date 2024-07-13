import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { Bounce, toast } from 'react-toastify';



const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const navigate= useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
        toast.success("Item Removed from Cart",{
            position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
          })
    }
    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += item.price.mrp
            discount += (item.price.mrp - item.price.cost) 
        })
let totalPrice = price - discount;
let deliveryCharge = 40;
let lastPrice = totalPrice + deliveryCharge
console.log(lastPrice);
return lastPrice;
    }

const checkoutHandler = async(amount)=>{


        const {data:{key}}= await axios.get('http://localhost:8000/getkey')

        const {data:{order}} = await axios.post("http://localhost:8000/api/checkout",{
            amount
        })
        
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order.amount,
            currency: "INR",
            name: 'Flipkart',
            description: 'Flipkart Payment',
            image: "../../../public/newflip.jpeg",
            order_id: order.id, // Order ID 
            // callback_url :'http://localhost:3000',
            handler: function (response) {
                // Handle payment success here
                // console.log(response.razorpay_payment_id);
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature);
                setTimeout(() => {
                    navigate("/")
                },2000);
                // Call your server to verify the payment and update the order status
              },
            
            prefill: {
              name: '',
              email: 'test10@example.com',
              contact: '7016618382'
            },
            notes: {
              address: 'Razorpay Corporate Office'
            },
            theme: {
              color: '#F37254'
            }
          };

        const razor = new window.Razorpay(options);
        
            razor.open();
          


    }
    

    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => checkoutHandler(totalAmount())} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;