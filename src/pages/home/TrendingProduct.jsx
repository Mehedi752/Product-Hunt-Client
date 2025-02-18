import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { FaArrowUp } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TrendingProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: trendingProducts = [], refetch } = useQuery({
        queryKey: ["trendingProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/trending/topSix');
            return res.data;
        },
    });

    // Handle upvote functionality
    const handleUpvote = async (productId) => {
        if (!user) {
            navigate("/auth/login");
            return;
        }

        try {
            const response = await axiosPublic.patch(`/products/upvote/${productId}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Upvoted!',
                    text: 'You have successfully upvoted this product.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (error) {
            console.error("Error upvoting product:", error);
        }
    };

    const handleDetails = (id) => {
        if (!user) {
            navigate('/auth/login');
            return;
        }
        navigate(`/productDetails/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Trending Products</h2>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {trendingProducts.map((product) => (
                    <div onClick={() => handleDetails(product._id)} key={product._id}
                        className="group relative bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
                        {/* Product Image */}
                        <div className="flex items-center gap-3 px-6 pt-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-xl"
                            />
                            <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                        </div>

                        {/* Product Information */}
                        <div className="p-6 space-y-4">

                            <p className="text-sm text-gray-600">{product.description}</p>

                            {/* Tags */}
                            <div className="text-xs text-gray-500">
                                {product.tags.map((tag, idx) => (
                                    <span key={idx} className="inline-block mr-2 mb-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Upvote Button */}
                            <button
                                onClick={() => handleUpvote(product._id)}
                                disabled={user?.email === product.ownerEmail}
                                className={`mt-4 btn btn-primary py-2 px-4 rounded-xl text-white font-semibold transition-all duration-300`}
                            >
                                <FaArrowUp className="inline-block mr-2 text-lg" />
                                Upvote ({product.upvotes})
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Show All Button */}
            <div className="mt-12 text-center">
                <Link to="/products">
                    <button className="btn btn-primary text-white py-2 px-12 rounded-full text-lg  transition-colors duration-300">
                        Show All Products
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TrendingProducts;
