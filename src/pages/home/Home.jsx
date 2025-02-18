
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProduct';
import CouponCarousel from './CouponCarousel';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <CouponCarousel></CouponCarousel>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;