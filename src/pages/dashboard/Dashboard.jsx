import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Admin from './adminPanel/Admin';
import User from './userPanel/user';
import Moderator from './moderatorPanel/Moderator';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import axios from 'axios';
import PrivateRoute from '../../provider/PrivateRoute';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
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
