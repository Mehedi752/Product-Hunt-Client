import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FeaturedProducts = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch featured products sorted by timestamp
    const { data: featuredProducts = [], isLoading, refetch } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/featured');
            return res.data;
        },
    });
    console.log(featuredProducts);

    // Handle upvote functionality
    const handleUpvote = async (productId) => {
        if (!user) {
            Swal.error({
                icon: "error",
                title: "Not Logged In",
                text: "You must be logged in to upvote products.",
                timer: 2000,
                showConfirmButton: false,
            })
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

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-lg border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="px-8 pt-8 pb-4 rounded-lg  w-full h-48 object-cover object-center"
                        />
                        <div className="p-6">
                            <h3
                                onClick={() => navigate(`/productDetails/${product._id}`)}
                                className="text-2xl font-semibold text-blue-600 cursor-pointer hover:underline transition-colors"
                            >
                                {product.name}
                            </h3>
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
                            <button
                                onClick={() => handleUpvote(product._id)}
                                disabled={user?.email === product.owner}
                                className={`mt-6 flex items-center justify-center w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors
                                    ${user?.email === product.owner
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                <FaArrowUp className="mr-2 text-lg" /> Upvote ({product.upvotes})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
