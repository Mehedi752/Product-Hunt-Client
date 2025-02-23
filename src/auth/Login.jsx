import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
    const navigate = useNavigate();
    const { setUser, signInWithGoogle, signInUser, setLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const { email, password } = data;
        console.log(data);

        signInUser(email, password)
            .then((res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
                navigate(location.state ? location.state : '/');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    role: 'user',
                    isSubscribed: false,
                    productAddCount: 0, // Set productAdd to 0 by default
                    voteAddCount: 0, // Set voteAdd to 0 by default
                }

                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log(res);
                        if (res.data.insertedId) {
                            console.log('User registered successfully');
                        }
                    })

                navigate(location.state ? location.state : '/');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="bg-base-200 pt-24">
            <div className="flex items-center justify-center container mx-auto py-[72px] px-6 lg:px-[450px]">
                <div className="w-full p-12 space-y-4 bg-white rounded shadow-lg">
                    <h1 className="text-2xl font-bold text-center">Login</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input input-bordered w-full dark:bg-white dark:text-black"
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && <p className="text-red-600">Email is required</p>}
                        </div>
                        <div className="relative mb-4">
                            <label className="block mb-1 text-sm font-semibold">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/
                                })}
                                className="input input-bordered w-full dark:bg-white dark:text-black"
                                placeholder="Enter your password"
                                required
                            />

                            <div onClick={() => setShowPassword(!showPassword)} className='absolute right-4 bottom-4'>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </div>

                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be at most 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain at least one uppercase
                                letter, one lowercase letter, one number and one special character</p>}

                        </div>

                        <button type="submit" className="btn text-white btn-primary w-full">
                            Login
                        </button>
                    </form>

                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn btn-primary btn-outline w-full flex items-center"
                    >
                        <FaGoogle className=""></FaGoogle>
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
        </div>
    );
};

export default Login;
