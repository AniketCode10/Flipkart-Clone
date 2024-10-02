import React,  { useEffect } from 'react';

import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Home = () => {
    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products.slice(0,7)} />
                <MidSection />
                <Slide
                    data={products.slice(7,13)} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products.slice(13,20)} 
                    title='Suggested Items'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products.slice(20,30)} 
                    title='Top Sarees'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Recommended Items'
                    timer={false} 
                    multi={true} 
                />
            </Component>
        </>
    )
}

export default Home;