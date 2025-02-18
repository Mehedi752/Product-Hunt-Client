import { FiUserCheck, FiShield } from 'react-icons/fi';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const Users = () => {
    const axiosPublic = useAxiosPublic();



    // Fetch users from API or database
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
    });
    console.log(users);



    // Handlers for updating roles
    const handleMakeAdmin = (user) => {

        axiosPublic.put(`/users/makeAdmin/${user._id}`)
            .then((res) => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `User ${user.name} is now an Admin.`,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
                refetch();
            })
            .catch((err) => {
                console.error('Error making user Admin:', err);
            });
    };

    console.log(users);

    const handleMakeModerator = (user) => {
        axiosPublic.put(`/users/makeModerator/${user._id}`)
            .then((res) => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `User ${user.name} is now a Moderator.`,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
                refetch();
            })
            .catch((err) => {
                console.error('Error making user Moderator:', err);
            });
    };

    return (
        <div className="p-6 bg-gray-50 container mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Users</h1>
            <div className="overflow-x-auto pb-12">
                <table className="w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 hidden md:block">#</th>
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

                                <td className="px-4 py-2 hidden md:block">
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
                                        className={`px-2 py-1  text-sm font-medium ${user.role === 'admin'
                                            ? 'bg-blue-100 text-blue-600'
                                            : user.role === 'moderator'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-300 text-gray-800'
                                            }`}
                                    >
                                        {user.role || 'user'}
                                    </span>
                                </td>

                                <td className="lg:px-4 py-2 text-center flex flex-col lg:flex-row items-center gap-2">
                                    <button
                                        onClick={() => handleMakeModerator(user)}
                                        className="btn btn-sm btn-primary"
                                        disabled={user.role === 'moderator'}
                                    >
                                        <FiUserCheck className="lg:inline-block mr-1 hidden" />
                                        Make Moderator
                                    </button>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm bg-red-500 text-white"
                                        disabled={user.role === 'admin'}
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
