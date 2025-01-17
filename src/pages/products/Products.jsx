import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; // A reusable Pagination component

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products', {
                    params: { search, page: currentPage, limit: 6 },
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [search, currentPage, axios]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Accepted Products</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by tags..."
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="card bg-white shadow-md rounded-lg p-4">
                        <img src={product.image} alt={product.name} className="rounded-md w-full mb-4" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-500">{product.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="badge badge-primary">{product.votes} Votes</span>
                            <button className="btn btn-sm btn-secondary">Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Products;
