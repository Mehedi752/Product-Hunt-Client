import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logoImg from "../assets/logo1.png";

const Navbar = () => {

    const { user, signOutUser } = useAuth();
    console.log(user);
    const handleLogout = () => {
        signOutUser();
    }


    return (
        <div className="bg-blue-500">
            <div className="navbar container mx-auto flex items-center justify-between py-4">

                <div className="flex items-center gap-2">
                        <img src={logoImg} alt="Logo" className="w-10 h-10 mr-2" />
                        <h3 className="text-white text-2xl hidden lg:block">Product Hunt</h3>
                </div>

                <div className="flex items-center gap-2 lg:w-[30%]">
                    <ul className="menu menu-horizontal px-1 text-base text-white">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center">
                    {!user ? (
                        <li className="list-none">
                            <Link
                                to="/auth/login"
                                className="btn btn-primary border-white px-4 py-2 text-white rounded-md hover:bg-primary-focus"
                            >
                                Login
                            </Link>
                        </li>
                    ) : (
                        <div className="dropdown dropdown-end">
                            {/* Avatar Button */}
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar hover:opacity-90"
                            >
                                <div className="w-10 h-10 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt="User Avatar"
                                        className="object-cover"
                                    />
                                </div>
                            </label>

                            {/* Dropdown Menu */}
                            <ul
                                tabIndex={0}
                                className="mt-3 p-4 shadow-lg menu menu-compact dropdown-content bg-white rounded-box w-60 space-y-2"
                            >
                                {/* User Name */}
                                <li className="text-sm font-semibold text-gray-100">
                                    <span className="block px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800">
                                        {user.displayName || "User"}
                                    </span>
                                </li>

                                {/* Dashboard Link */}
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-600 rounded-md hover:bg-primary hover:text-white transition"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                {/* Logout Button */}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-gray-600 rounded-md hover:bg-red-500 hover:text-white transition"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
