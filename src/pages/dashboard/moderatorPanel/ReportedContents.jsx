import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ReportedContents = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/all/reports');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .delete(`/products/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Reported product has been deleted successfully.',
                            'success'
                        );
                        refetch();
                    })
                    .catch((error) => console.error(error));
            }
        });
    };

    const viewDetails = (id) => {
        navigate(`/productDetails/${id}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Reported Products
            </h1>
            {reportedProducts.length === 0 ? (
                <p className="text-lg text-center text-gray-600">
                    No reported products found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wider">
                                <th className="border px-6 py-4 text-left">Product Name</th>
                                <th className="border px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedProducts.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100`}
                                >
                                    <td className="border px-6 py-4 text-gray-700">
                                        {product.name}
                                    </td>
                                    <td className="border px-6 py-4 flex items-center space-x-4">
                                        <button
                                            onClick={() => viewDetails(product._id)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportedContents;
