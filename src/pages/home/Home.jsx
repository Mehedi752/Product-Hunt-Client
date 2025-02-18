
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProduct';
import CouponCarousel from './CouponCarousel';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <CouponCarousel></CouponCarousel>
        </div>
    );
};

export default Home;