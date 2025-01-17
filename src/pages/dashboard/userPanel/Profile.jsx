import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Profile = () => {
    const { user } = useAuth(); // Fetch authenticated user
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details, including subscription status
        axiosPublic.get(`/users/${user?.email}`)
            .then((res) => {
                setCurrentUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user?.email, axiosPublic]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubscribe = () => {
        // Show modal or redirect to payment page
        setShowModal(true);
    };

    const handleSubscriptionSuccess = () => {
        // Update user's subscription status on success
        // axiosPublic.put(`/users/${user?.email}/subscribe`, { status: 'Verified' })
        //     .then(() => {
        //         toast.success('Subscription successful!');
        //         setCurrentUser((prev) => ({ ...prev, isSubscribed: true }));
        //         setShowModal(false);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         toast.error('Something went wrong!');
        //     });
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-5">My Profile</h1>
            <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center">{currentUser?.name || 'User'}</h2>
                <p className="text-center text-gray-600">{currentUser?.email}</p>

                {currentUser?.isSubscribed ? (
                    <div className="mt-6 text-center">
                        <p className="text-green-600 font-semibold">Status: Verified</p>
                    </div>
                ) : (
                    <button
                        onClick={handleSubscribe}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700"
                    >
                        Subscribe - $10
                    </button>
                )}
            </div>

            {/* Render Subscription Modal */}
            {showModal && (
                <SubscriptionModal
                    onClose={() => setShowModal(false)}
                    onSuccess={handleSubscriptionSuccess}
                />
            )}
        </div>
    );
};

export default Profile;
