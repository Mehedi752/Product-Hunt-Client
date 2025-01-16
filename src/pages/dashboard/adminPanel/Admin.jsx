import { NavLink, Outlet } from 'react-router-dom';
import { FiBarChart2, FiUsers, FiGift } from 'react-icons/fi';

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <NavLink
                                to="statistics"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-gray-700 ${
                                        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                                    } rounded-lg`
                                }
                            >
                                <FiBarChart2 className="w-5 h-5 mr-3" />
                                Statistics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/admin/users"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-gray-700 ${
                                        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                                    } rounded-lg`
                                }
                            >
                                <FiUsers className="w-5 h-5 mr-3" />
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="manage-coupons"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-gray-700 ${
                                        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                                    } rounded-lg`
                                }
                            >
                                <FiGift className="w-5 h-5 mr-3" />
                                Manage Coupons
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
                </div>
                <div className="mt-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Admin;
