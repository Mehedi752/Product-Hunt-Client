import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiList, FiFlag } from "react-icons/fi";

const Moderator = () => {
    return (
        <div className="flex flex-col lg:flex-row  bg-gray-100">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-green-600">Moderator Dashboard</h1>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/dashboard/moderator/reviewQueue"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 ${isActive ? "bg-green-100 text-green-600" : "hover:bg-gray-200"
                                    } rounded-lg`
                                }
                            >
                                <FiList className="w-5 h-5 mr-3" />
                                Product Review Queue
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/moderator/reportedContents"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 ${isActive ? "bg-green-100 text-green-600" : "hover:bg-gray-200"
                                    } rounded-lg`
                                }
                            >
                                <FiFlag className="w-5 h-5 mr-3" />
                                Reported Contents
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="lg:flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Moderator;
