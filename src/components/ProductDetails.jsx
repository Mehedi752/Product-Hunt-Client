import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const ProductDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [reviewData, setReviewData] = useState({ description: '', rating: '' });

    // Fetch product details
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/id/${id}`);
            return res.data;
        },
    });
    console.log(product);

    // Fetch reviews for the product
    const { data: reviews = [], refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/product/${id}`);
            return res.data;
        },
    });

    // Handle Upvote
    const handleUpvote = async () => {
        try {
            const response = await axiosPublic.patch(`/products/upvote/${id}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Upvoted!',
                    text: 'You have successfully upvoted this product.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error upvoting product:', error);
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
            if (response.data.acknowledged) {
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
        <div className="container mx-auto px-6 py-8">
            {/* Product Details Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md"
                    />
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                </div>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleUpvote}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Upvote ({product.upvotes})
                    </button>
                    <button
                        onClick={handleReport}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                        Report
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-50 shadow rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="grid gap-4">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 bg-white shadow rounded-md flex items-start gap-4"
                            >
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{review.reviewerName}</h3>
                                    <p className="text-gray-600 text-sm">{review.description}</p>
                                    <p className="text-yellow-500 font-bold">
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
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Post a Review</h2>
                <form onSubmit={handleReviewSubmit} className="grid gap-4">
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                        placeholder="Reviewer Name"
                    />
                    <input
                        type="text"
                        value={user?.photoURL || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                        placeholder="Reviewer Image URL"
                    />
                    <textarea
                        value={reviewData.description}
                        onChange={(e) =>
                            setReviewData({ ...reviewData, description: e.target.value })
                        }
                        placeholder="Write your review here..."
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                    <input
                        type="number"
                        value={reviewData.rating}
                        onChange={(e) =>
                            setReviewData({ ...reviewData, rating: e.target.value })
                        }
                        placeholder="Rating (1-5)"
                        className="input input-bordered w-full"
                        required
                        min="1"
                        max="5"
                    />
                    <button
                        type="submit"
                        className="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
