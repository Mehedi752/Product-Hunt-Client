import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ProductReviewQueue = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // Fetch all products using Tanstack Query.
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        },
    });

    // Update product status
    const updateStatus = async (id, status) => {
        try {
            const response = await axiosPublic.patch(`/products/id/${id}`, { status });
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Status Updated',
                    text: `Product status set to ${status}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                refetch();
            }
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    // Mark product as featured
    const makeFeatured = async (id) => {
        try {
            const response = await axiosPublic.patch(`/products/id/${id}`, { featured: true });
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Marked as Featured',
                    text: 'This product is now featured.',
                    showConfirmButton: false,
                    timer: 2000,
                });
                refetch();
            }
        } catch (error) {
            console.error('Error marking product as featured:', error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Product Review Queue
            </h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">#</th>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">Product Name</th>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-700">{product.name}</td>
                                    <td className="px-6 py-4 flex flex-wrap gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/productDetails/${product._id}`)
                                            }
                                            className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700 transition"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => makeFeatured(product._id)}
                                            className={`px-4 py-2 text-sm font-medium rounded-md ${
                                                product.featured
                                                    ? 'bg-green-300 text-white cursor-not-allowed'
                                                    : 'bg-green-600 text-white hover:bg-green-700'
                                            } transition`}
                                            disabled={product.featured}
                                        >
                                            {product.featured ? 'Featured' : 'Make Featured'}
                                        </button>
                                        <button
                                            onClick={() => updateStatus(product._id, 'accepted')}
                                            className={`px-4 py-2 text-sm font-medium rounded-md ${
                                                product.status === 'accepted'
                                                    ? 'bg-gray-300 text-white cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            } transition`}
                                            disabled={product.status === 'accepted'}
                                        >
                                            {product.status === 'accepted'
                                                ? 'Accepted'
                                                : 'Accept'}
                                        </button>
                                        <button
                                            onClick={() => updateStatus(product._id, 'rejected')}
                                            className={`px-4 py-2 text-sm font-medium rounded-md ${
                                                product.status === 'rejected'
                                                    ? 'bg-gray-300 text-white cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700'
                                            } transition`}
                                            disabled={product.status === 'rejected'}
                                        >
                                            {product.status === 'rejected'
                                                ? 'Rejected'
                                                : 'Reject'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center text-gray-500 py-8"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReviewQueue;
