import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const price = 50;

    useEffect(() => {
        // Create paymentIntent when component mounts
        const createPaymentIntent = async () => {
            try {
                const res = await axiosPublic.post('/create-pament-intent', { price });
                setClientSecret(res.data.clientSecret); // Set the client secret
            }
            catch (error) {
                console.error('Error creating payment intent:', error);
                setError('Failed to create payment intent');
            }
        };

        createPaymentIntent();
    }, [price, axiosPublic]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        // Create PaymentMethod
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        // Confirm the payment with the client secret
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (paymentError) {
            setError(paymentError.message);
        } else {
            setError(null);

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // Save payment details to the database
                const paymentDetails = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    price,
                };

                try {
                    const res = await axiosPublic.post('/payments', paymentDetails);
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            text: 'Your payment has been successfully processed.',
                        });
                        axiosPublic.patch(`/users/subscribe/${user?.email}`)
                            .then((res) => {
                                console.log(res);
                                navigate('/dashboard/user/profile');
                            })
                            .catch((error) => {
                                console.error('Error subscribing user:', error);
                            });
                    }
                }
                catch (error) {
                    setError('Failed to save payment details', error);
                }
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="btn px-5 py-3 text-md btn-primary rounded-lg mx-auto my-6"
                >
                    Pay
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {transactionId && <p className="text-green-600">Payment successful. Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
