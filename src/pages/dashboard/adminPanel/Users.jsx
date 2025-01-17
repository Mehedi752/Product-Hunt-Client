import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { FiUser, FiMail, FiUserCheck, FiShield } from 'react-icons/fi';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);


    // Fetch users from API or database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPublic.get('/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }

        };
        fetchUsers();
    }, []);



    // Handlers for updating roles
    const handleMakeAdmin = (userId) => {
        // fetch(`/api/users/${userId}/make-admin`, { method: 'PUT' })
        //     .then((res) => res.json())
        //     .then(() => {
        //         setUsers((prev) =>
        //             prev.map((user) =>
        //                 user.id === userId ? { ...user, role: 'Admin' } : user
        //             )
        //         );
        //         alert('User has been made Admin.');
        //     });
    };

    const handleMakeModerator = (userId) => {
        // fetch(`/api/users/${userId}/make-moderator`, { method: 'PUT' })
        //     .then((res) => res.json())
        //     .then(() => {
        //         setUsers((prev) =>
        //             prev.map((user) =>
        //                 user.id === userId ? { ...user, role: 'Moderator' } : user
        //             )
        //         );
        //         alert('User has been made Moderator.');
        //     });
    };

    return (
        <div className="p-6 bg-gray-50 container mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Users</h1>
            <div className="overflow-x-auto pb-12">
                <table className="w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left hidden lg:block">Email</th>
                            <th className="px-4 py-2 text-center">Role</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                                    } hover:bg-gray-200`}
                            >

                                <td className="px-4 py-2">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-2">
                                    {user.name}
                                </td>

                                <td className="px-4 py-2 hidden lg:block">
                                    {user.email}
                                </td>

                                <td className="px-4 py-2 text-center">
                                    <span
                                        className={`px-2 py-1  text-sm font-medium ${user.role === 'Admin'
                                            ? 'bg-blue-100 text-blue-600'
                                            : user.role === 'Moderator'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {user.role || 'User'}
                                    </span>
                                </td>

                                <td className="lg:px-4 py-2 text-center flex flex-col lg:flex-row items-center gap-2">
                                    <button
                                        onClick={() => handleMakeModerator(user._id)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FiUserCheck className="lg:inline-block mr-1 hidden" />
                                        Make Moderator
                                    </button>
                                    <button
                                        onClick={() => handleMakeAdmin(user._id)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        <FiShield className="lg:inline-block mr-1 hidden " />
                                        Make Admin
                                    </button>
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
