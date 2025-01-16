import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ErrorPage from "../pages/error/ErrorPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/dashboard/adminPanel/Users";
import User from "../pages/dashboard/userPanel/user";
import PrivateRoute from "../provider/PrivateRoute";
import Admin from "../pages/dashboard/adminPanel/Admin";
import Moderator from "../pages/dashboard/moderatorPanel/Moderator";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: "/dashboard/admin",
                        element: <PrivateRoute><Admin /></PrivateRoute>,
                    },
                    {
                        path: "/dashboard/moderator",
                        element: <PrivateRoute><Moderator /></PrivateRoute>,  // Protect Moderator route with PrivateRoute
                    },
                    {
                        path: "/dashboard/user",
                        element: <PrivateRoute><User /></PrivateRoute>,  // Protect User route with PrivateRoute
                    },
                    {
                        path: '/dashboard/admin/users',
                        element: <PrivateRoute><Users></Users></PrivateRoute>
                    }
                ]
            },

        ]
    },
]);

export default router;