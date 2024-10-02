import { useContext, useEffect, useState } from 'react';
// import { Dialog, Transition } from "@headlessui/react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    
} from '@mui/material';

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
import { Fragment } from 'react';
import { LoginContext } from '../../context/ContextProvider';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: '#2874f0', // Flipkart blue
    color: '#ffffff',
}));

const StyleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#fb641b', // Flipkart yellow
    color: '#fff',
    width: '120px',
    height: '41px',
    '&:hover': {
        backgroundColor: '#ffcc00', // Darker yellow on hover
    },
}));

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

        // let [isOpen, setIsOpen] = useState(false);

        // function closeModal() {
        //   setIsOpen(false);
        // }
      
        // function openModal() {
        //   setIsOpen(true);
        // }
        const [open, setOpen] = useState(false);
        const [formData, setFormData] = useState({
            name: '',
            address: '',
            phone: '',
            pincode: '',
        });
        const [errors, setErrors] = useState({}); // To hold error messages
    
        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
            setFormData({ name: '', address: '', phone: '', pincode: '' }); // Reset form data
            setErrors({}); // Reset errors
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: '' }); // Clear error for the current field
        };
    
        const validateFields = () => {
            const newErrors = {};
            for (const key in formData) {
                if (!formData[key]) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                }
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0; // Return true if no errors
        };
    
        const handleConfirm = () => {
            if (validateFields()) {
                // Handle the confirm action (e.g., form submission)
                console.log(formData);
                handleClose();
            }
        };

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


        const {data:{key}}= await axios.get("https://flipkart-backend-j2ae.onrender.com/getkey")

        const {data:{order}} = await axios.post("https://flipkart-backend-j2ae.onrender.com/api/checkout",{
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
    const { account, setAccount } = useContext(LoginContext);

    const  checkLogin = ()=>{

        if(!account){
            toast.error("Please Login to Proceed");
        }else{
            handleClickOpen();
        }
    }
    
    // const bothEvents = ()=>{
    //   checkLogin();
    //     if(checkLogin()){ 
    //         handleClickOpen()
    //     }
        
    // }

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
                        {/* <StyledButton onClick={() => checkoutHandler(totalAmount())} variant="contained">Place Order</StyledButton> */}
                        <StyledButton onClick={()=>checkLogin()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                <StyledDialogTitle>Enter Your Delivery Credentials</StyledDialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone Number"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="pincode"
                        label="Pincode"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={formData.pincode}
                        onChange={handleChange}
                        error={!!errors.pincode}
                        helperText={errors.pincode}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <StyleButton  onClick={() => checkoutHandler(totalAmount())} disabled={Object.values(formData).some(x => x === '')}>
                        Confirm
                    </StyleButton>
                </DialogActions>
            </Dialog>
            </Component> : <EmptyCart />
        }
  
        </>

    )
}

export default Cart;
