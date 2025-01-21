import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';


// Stripe's public key
const stripePromise = loadStripe(import.meta.env.VITE_PaymentPublishKey);

// eslint-disable-next-line react/prop-types
const PaymentModal = ({ onClose }) => {
    return (
        <Elements stripe={stripePromise}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-80">
                    <h3 className="text-2xl font-bold text-center mb-4">Subscribe for Membership</h3>
                    <div className="text-center mb-4">
                        <p className="text-gray-700">Get unlimited access to add products by purchasing the membership subscription.</p>
                    </div>
                    <CheckoutForm /> {/* This is where CheckoutForm is being used */}
                    <button
                        className="w-full mt-4 text-center text-red-600"
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
