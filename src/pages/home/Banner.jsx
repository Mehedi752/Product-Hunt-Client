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

                <div className="w-full lg:h-[1000px] relative">

                    <div className="relative w-full h-full rounded-lg overflow-hidden">

                        <img src={bannerImg2} alt="Banner Image" className="w-full h-full object-cover rounded-lg shadow-lg" />

                        <div className="absolute inset-0 hidden lg:flex items-end justify-start p-8 lg:p-12 bg-gradient-to-t from-black via-transparent to-transparent">
                            <div className="bg-white bg-opacity-80 rounded-lg p-6 lg:p-12 max-w-lg w-full">
                                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800">Discover Amazing Products</h2>
                                <p className="mt-4 text-gray-600 font-light text-lg">
                                    Explore the latest and most innovative products across technology, lifestyle, and beyond. Whether you're looking for trending gadgets, unique ideas, or groundbreaking tools, our platform connects you with the best the market has to offer.
                                    Start your journey today and revolutionize the way you shop.
                                </p>
                                <Link to="/products" className="mt-6 inline-block text-white font-semibold bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-md px-6 py-3 text-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
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