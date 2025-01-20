import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useProducts from '../../hooks/useProducts';
import { FaArrowUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const ProductCard = ({ product }) => {
    const axiosPublic = useAxiosPublic();
    const [products, refetch] = useProducts();
    const {user} = useAuth();
    const navigate = useNavigate();

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
    return (
        <div className="bg-white border p-6 border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 rounded-t-lg object-cover"
            />
            <div className="pt-3">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>

                <div className="flex gap-2 mt-2 flex-wrap">
                    {product.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-600 py-1 px-3 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={`/productDetails/${product._id}`}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm "
                    >
                        View Details
                    </Link>

                    <button
                        onClick={() => handleUpvote(product._id)}
                        className="flex items-center justify-center py-2 px-4 rounded-lg text-white font-semibold transition-colors
                               bg-blue-600 hover:bg-blue-700"
                    >
                        <FaArrowUp className="mr-2 text-lg" /> Upvote ({product.upvotes})
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
