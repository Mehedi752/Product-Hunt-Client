import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { BiSolidUpvote } from 'react-icons/bi';

const TrendingProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trendingProducts = [], isLoading,refetch } = useQuery({
        queryKey: ["trendingProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/trending/topSix');
            return res.data;
        },
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Trending Products</h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                {trendingProducts.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
                        {/* Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full p-6 rounded-lg h-64 object-cover mb-4 group-hover:opacity-90 transition-opacity duration-300"
                        />

                        {/* Product Info */}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{product.description}</p>

                            <div className="flex justify-between items-center">
                                {/* Tags */}
                                <span className="text-xs text-gray-400">{product.tags.join(', ')}</span>

                                {/* Upvote Button */}
                                <button
                                    className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                    disabled={product.owner === 'currentUserId'} // Disable if the user is the product owner
                                >
                                    <span className="flex items-center">
                                        <BiSolidUpvote />
                                        {product.upvotes}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show All Button */}
            <div className="mt-8 text-center">
                <Link to="/products">
                    <button className="bg-green-500 text-white py-3 px-10 rounded-full hover:bg-green-600 transition-colors duration-300">
                        Show All Products
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TrendingProducts;
