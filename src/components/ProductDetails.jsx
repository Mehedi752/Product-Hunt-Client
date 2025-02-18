import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [reviewData, setReviewData] = useState({ description: '', rating: '' });
    const navigate = useNavigate();

    // Fetch product details
    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/id/${id}`);
            return res.data;
        },
    });

    // Fetch reviews for the product
    const { data: reviews = [], refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/${id}`);
            return res.data;
        },
    });


    // Handle Upvote
    const handleUpvote = async (productId) => {
        if (!user) {
            navigate("/auth/login");
            return;
        }

        try {
            // Proceed with the upvote
            const response = await axiosPublic.patch(`/products/upvote/${productId}`)

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
        }
        catch (error) {
            console.error("Error upvoting product:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong while upvoting. Please try again.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };


    // Handle Report
    const handleReport = async () => {
        try {
            const response = await axiosPublic.post(`/products/report/${id}`);
            if (response.data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Reported!',
                    text: 'This product has been reported.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error reporting product:', error);
        }
    };

    // Handle Review Submit
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const reviewPayload = {
            productId: id,
            reviewerName: user.name,
            reviewerImage: user.photoURL,
            description: reviewData.description,
            rating: reviewData.rating,
        };

        try {
            const response = await axiosPublic.post('/reviews', reviewPayload);
            if (response.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review Submitted!',
                    text: 'Your review has been added successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setReviewData({ description: '', rating: '' });
                refetchReviews();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Product Details Section */}
            <div className="bg-gradient-to-r from-white to-gray-50 shadow-md rounded-lg p-8 mb-12">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
                    </div>
                    <a
                        href={product.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold border px-3 py-2 rounded-lg transition duration-200"
                    >
                        Visit <FaExternalLinkAlt />
                    </a>
                </div>
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => handleUpvote(product._id)}
                        disabled={user?.email === product.ownerEmail}
                        className={`btn btn-primary flex items-center justify-center rounded-lg text-white font-semibold transition-colors`}
                    >
                        <FaArrowUp className="mr-2 text-lg" /> Upvote ({product.upvotes})
                    </button>
                    <button
                        onClick={handleReport}
                        className="btn btn-danger text-white px-5 py-2 rounded-lg shadow-lg bg-red-500"
                    >
                        Report
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow-md rounded-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-6 bg-gray-100 rounded-lg shadow-sm flex gap-4"
                            >
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-700">
                                        {review.reviewerName}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {review.description}
                                    </p>
                                    <p className="text-yellow-500 font-semibold">
                                        Rating: {review.rating} / 5
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>

            {/* Post Review Section */}
            <div className="bg-gray-50 shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Post a Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 border-gray-300"
                        placeholder="Reviewer Name"
                    />
                    <input
                        type="text"
                        value={user?.photoURL || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 border-gray-300"
                        placeholder="Reviewer Image URL"
                    />
                    <textarea
                        value={reviewData.description}
                        onChange={(e) =>
                            setReviewData({ ...reviewData, description: e.target.value })
                        }
                        placeholder="Write your review here..."
                        className="textarea textarea-bordered w-full bg-white border-gray-300"
                        required
                    ></textarea>
                    <input
                        type="number"
                        value={reviewData.rating}
                        onChange={(e) =>
                            setReviewData({ ...reviewData, rating: e.target.value })
                        }
                        placeholder="Rating (1-5)"
                        className="input input-bordered w-full bg-white border-gray-300"
                        required
                        min="1"
                        max="5"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary text-white px-5 py-2 rounded-lg shadow-lg "
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
