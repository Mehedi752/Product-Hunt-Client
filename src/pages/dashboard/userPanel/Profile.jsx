import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import PaymentModal from './PaymentModal';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const { user } = useAuth(); // Fetch authenticated user
    const [showModal, setShowModal] = useState(false);
    const axiosPublic = useAxiosPublic();

    //Fecth user data from the server using Tanstack's useQuery hook
    const { data: currentUser = [], refetch } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const handleSubscribe = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        refetch();
    }


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
                        className="mt-6 btn btn-primary text-white px-6 py-2 rounded-lg w-full "
                    >
                        Subscribe - $50
                    </button>
                )}
            </div>

            {/* Render Subscription Modal */}
            {showModal && (
                <PaymentModal
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Profile;
