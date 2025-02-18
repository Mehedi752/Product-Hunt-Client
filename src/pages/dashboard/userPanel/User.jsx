 
import { NavLink, Outlet } from "react-router-dom";
import { FiUser, FiPlus, FiList, FiBarChart2 } from "react-icons/fi";

const User= () => {
    return (
        <div className="flex flex-col lg:flex-row bg-gray-100">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">User Dashboard</h1>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/dashboard/user/profile"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"
                                    } rounded-lg`
                                }
                            >
                                <FiUser className="w-5 h-5 mr-3" />
                                My Profile
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink
                                            to='/dashboard/user/overview'
                                            className={({ isActive }) =>
                                              `flex items-center px-4 py-3 text-gray-700 ${
                                                isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                                              } rounded-lg`
                                            }
                                          >
                                            <FiBarChart2 className='w-5 h-5 mr-3' />
                                            Statistics
                                          </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/user/addProduct"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"
                                    } rounded-lg`
                                }
                            >
                                <FiPlus className="w-5 h-5 mr-3" />
                                Add Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/user/myProducts"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"
                                    } rounded-lg`
                                }
                            >
                                <FiList className="w-5 h-5 mr-3" />
                                My Products
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default User;
