import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

i

const AcceptedProducts = () => {
    const axiosPublic = useAxiosPublic();

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

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to the first page when searching
        refetch();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Accepted Products</h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search by tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {/* Products Grid */}
            {acceptedProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {acceptedProducts.products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No products found.</p>
            )}

            {/* Pagination */}
            <div className="mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={acceptedProducts.totalPages || 1}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AcceptedProducts;
