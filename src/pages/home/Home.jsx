import React from 'react';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProduct';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>

        </div>
    );
};

export default Home;