import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Pagination from './Pagination';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaArrowUp } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AcceptedProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const { data: acceptedProducts = {}, refetch } = useQuery({
        queryKey: ['acceptedProducts', searchTerm, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/status/accepted`, {
                params: {
                    search: searchTerm,
                    page: currentPage,
                    limit: productsPerPage,
                },
            });
            return res.data; // Expected format: { products: [], totalPages: number }
        },
    });
    console.log(acceptedProducts);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to the first page when searching
        refetch();
    };

    const handleUpvote = async (productId) => {
        if (!user) {
            navigate('/auth/login');
            return;
        }

        try {
            const response = await axiosPublic.patch(`/products/upvote/${productId}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Upvoted!',
                    text: 'You successfully upvoted this product.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (error) {
            console.error('Error upvoting product:', error);
        }
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Accepted Products
                </h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-6 flex justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by tags or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-lg border border-gray-300 rounded-lg px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Search
                    </button>
                </form>

                {/* Products Grid */}
                {acceptedProducts.products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {acceptedProducts.products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-xl hover:shadow-2xl mt-6 border transition-shadow duration-300 transform hover:scale-105">
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-xl px-6 pt-6"
                                />

                                {/* Product Details */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                                        {product.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between items-center">
                                        {/* View Details */}
                                        <Link
                                            to={`/productDetails/${product._id}`}
                                            className="text-white btn btn-primary px-4 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            View Details
                                        </Link>

                                        {/* Upvote Button */}
                                        <button
                                            onClick={() => handleUpvote(product._id)}
                                            disabled={user?.email === product.ownerEmail}
                                            className={`btn btn-primary py-2 px-4 rounded-xl text-white font-semibold transition-all duration-300`}
                                        >
                                            <FaArrowUp className="inline-block mr-2 text-lg" />
                                            Upvote ({product.upvotes})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">No products found.</p>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={acceptedProducts.totalPages || 1}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>

    );
};

export default AcceptedProducts;
