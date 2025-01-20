import  { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Admin from './adminPanel/Admin';
import Moderator from './moderatorPanel/Moderator';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import User from './userPanel/User';


const Dashboard = () => {
    const { user, loading } = useAuth();
    const [currentUser, setCurrentUser] = useState(user);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users/${user.email}`)
                .then((res) => {
                    setCurrentUser(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err);
                });
        }
    }, [user?.email, axiosPublic]);

    if (currentUser?.role)
        currentUser.role = "admin";

    console.log(user)
    console.log(currentUser)
    console.log(currentUser?.role)

    if (loading) {
        return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg text-info min-h-screen"></span></div>;
    }



    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl text-center font-bold">Welcome, {user?.displayName || 'User'}</h1>
            <p className="mt-2 text-center text-xl opacity-70 mb-6">Role: {currentUser?.role || 'User'}</p>

            {currentUser?.role === 'admin' && (
                <div>
                    <Admin></Admin>
                </div>
            )}

            {currentUser?.role === 'moderator' && (
                <div>
                    <Moderator></Moderator>
                </div>
            )}

            {currentUser?.role === "user" && (
                <div>
                    <User></User>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
