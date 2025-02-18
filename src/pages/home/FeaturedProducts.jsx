
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
    const { data: featuredProducts = [], refetch } = useQuery({
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
        <div className="container mx-auto px-6 my-12">
            <h2 className="text-4xl font-extrabold mb-8 text-red-500 text-center">
                <span className="text-black">Featured Products</span> Section🔎</h2>
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
                                disabled={user?.email === product.ownerEmail}
                                className={`mt-6 btn btn-primary flex items-center justify-center w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors`}
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
