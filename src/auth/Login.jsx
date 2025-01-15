import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { setUser, signInWithGoogle } = useAuth();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        // const password = e.target.password.value;

        // console.log({ email, password });
        // // Call your login function and redirect on success
        // navigate("/");
    };

    const handleGoogleSignIn = () => {

        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                navigate(location.state ? location.state : '/');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>
                <div className="divider">OR</div>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline btn-primary w-full"
                >
                    Sign in with Google
                </button>
                <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-red-600">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
