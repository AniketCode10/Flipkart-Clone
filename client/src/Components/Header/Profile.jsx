import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
import { Bounce, toast } from 'react-toastify';

const Component = styled(Menu)`
    margin-top: 5px;
    
`;
const LoginText= styled(Typography)`
    marginTop: 2px,
    cursor:pointer
    
`;



const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
    cursor:'pointer';
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setAccount('');
        toast.success("Logged Out Successfully",{
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
    
    return (
        <>
            <Box onClick={handleClick}><LoginText  style={{}}>{account}</LoginText></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); logout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;