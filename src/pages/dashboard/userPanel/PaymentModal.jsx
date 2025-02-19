import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaClosedCaptioning } from 'react-icons/fa';

// Stripe's public key
const stripePromise = loadStripe(import.meta.env.VITE_PaymentPublishKey);

const PaymentModal = ({ onClose }) => {
    const axiosPublic = useAxiosPublic();
    const price = 50; // Subscription price
    const [couponPrice, setCouponPrice] = useState(null); // Discounted price
    const [error, setError] = useState(''); // Error message for invalid coupon

    // Fetch available coupons
    const { data: couponCards = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        },
    });

    // Handle coupon application
    const handleCoupon = (e) => {
        e.preventDefault();
        const couponCode = e.target.couponCode.value.trim();

        const coupon = couponCards.find((coupon) => coupon.code === couponCode);

        if (coupon) {
            const discountedPrice = price - (price * coupon.discountAmount) / 100;
            setCouponPrice(discountedPrice.toFixed(2)); // Update discounted price
            setError(''); // Clear any previous error
        } 
        else {
            setCouponPrice(null); // Reset discounted price
            setError('Invalid Coupon Code! Please enter the correct code.'); // Show error
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div
                    className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 relative animate-fade-in"
                    style={{ animationDuration: '300ms' }}
                >
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                        Subscribe for Membership
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                        Unlock unlimited access to add products by subscribing to our membership.
                    </p>
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-6">
                        <span className="text-lg font-medium text-gray-700">Subscription Price:</span>
                        <span className="text-lg font-bold text-blue-600">${price}</span>
                    </div>
                    <form onSubmit={handleCoupon} className="mb-4">
                        <input
                            type="text"
                            name="couponCode"
                            placeholder="Enter Coupon Code"
                            className="w-full p-3 dark:bg-white dark:text-black border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full btn bg-blue-600 hover:bg-blue-700 text-white py-3 mb-2 rounded-md font-medium transition duration-300"
                        >
                            Apply Coupon
                        </button>
                    </form>
                    {couponPrice ? (
                        <div className="flex justify-between items-center bg-green-100 p-3 rounded-md mb-6">
                            <span className="text-lg font-medium text-green-600">Discounted Price:</span>
                            <span className="text-lg font-bold text-green-700">${couponPrice}</span>
                        </div>
                    ) : (
                        error && <p className=" text-red-600 font-medium mb-4">{error}</p>
                    )}
                    <CheckoutForm amount={couponPrice || price} />
                    <button
                        className="w-full mt-4 btn bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium transition duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Elements>
    );
};

export default PaymentModal;
