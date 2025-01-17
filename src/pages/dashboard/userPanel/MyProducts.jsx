import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useProducts from '../../../hooks/useProducts';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [products, refetch] = useProducts();
    console.log(products);

    // Handle delete post
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/products/${id}`)
                    .then(() => {
                        Swal.fire(
                            "Deleted!",
                            "Your product has been deleted.",
                            "success"
                        );
                        refetch(); // Refetch products
                    })
                    .catch((error) => console.error(error));
            }
        });
    };

    // Handle update post
    const handleUpdate = (id) => {
        navigate(`/dashboard/user/updateProduct/${id}`); // Redirect to the update page
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">My Posts</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table-auto space-y-4 w-full text-left bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Votes</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product._id} className="hover:bg-gray-50 border-b">
                                    <td className="px-4 py-4">{index + 1}</td>
                                    <td className="px-4 py-4">{product.name}</td>
                                    <td className="px-4 py-4">{product.votes || 0}</td>
                                    <td
                                        className={`px-4 py-4 font-semibold ${product.status === 'Accepted' ? 'text-green-600' :
                                            product.status === 'Rejected' ? 'text-red-600' : 'text-yellow-500'
                                            }`}
                                    >
                                        {product.status || 'Pending'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => handleUpdate(product._id)}
                                            className="btn btn-sm btn-primary mr-2 text-white"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-sm btn-error bg-red-600 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProducts;
