import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import bannerImg2 from '../../assets/banner2.jpg';


const Banner = () => {
    return (
        <div className="">

            <div className="container mx-auto px-5 lg:px-0 w-full py-8 lg:py-12 helvetica-font">

                <div className='mb-12'>
                    <h1 className='text-3xl md:text-5xl lg:text-5xl font-bold px-5'>
                        Welcome to{' '}<br />
                        <span style={{ color: 'Red', fontWeight: 'bold' }}>
                            <Typewriter
                                words={['Product Hunt', 'Innovative Ideas', 'Tech Revolution']}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70} // Typing speed
                                deleteSpeed={50} // Deleting speed
                                delaySpeed={1000} // Delay between typing
                            />
                        </span>
                    </h1>
                </div>

                <div className="w-full lg:h-[800px] mb-12">

                    <div className="relative w-full rounded-lg lg:h-[800px]">
                        <div className="relative">
                            <img src={bannerImg2} alt="" className="rounded-lg" />
                            <div className="hidden lg:block bg-white absolute left-5 top-0 bg-opacity-80 px-8 py-5 lg:py-12 rounded-lg mt-[420px] ml-12 max-w-lg">
                                <h2 className="text-2xl font-bold">Discover Amazing Products</h2>
                                <p className="mt-4 font-extralight">
                                    Explore the latest and most innovative products across technology, lifestyle, and beyond. Whether you're looking for trending gadgets, unique ideas, or groundbreaking tools, our platform connects you with the best the market has to offer.
                                    Start your journey today and revolutionize the way you shop.</p>
                                <Link to="/products" className="btn btn-primary bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-none mt-4">
                                    Explore Products
                                </Link>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Banner;