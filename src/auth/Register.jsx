import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";


const Register = () => {
    const { createNewUser, setUser, updateProfileUser } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();

    const onSubmit = async (data) => {
        const { name, email, password, photoURL } = data;
        const user = { name, email, password, photoURL };
        console.log(user);

        createNewUser(email, password)
            .then((res) => {
                console.log(res);
                setUser(res.user);
                updateProfileUser(name, photoURL )
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registered Successfully',
                            text: 'You have been registered successfully',
                            timer: 1500,
                        });
                        navigate(location.state ? location.state : '/');
                    })
                    .catch((error) => {
                        setErrorMessage(error);
                    });

            })

    };

    return (
        <div className="bg-base-200">
            <div className="container mx-auto py-[72px] px-6 lg:px-[300px] ">
                <div className="p-12 bg-white rounded shadow-lg">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-semibold">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter your name"
                                required
                            />
                            {errors.name && <p className="text-red-600">Name is required</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && <p className="text-red-600">Email is required</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-semibold">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                {...register("photoURL", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter photo URL"
                            />
                            {errors.photoURL && <p className="text-red-600">Photo URL is required</p>}
                        </div>

                        <div className="relative mb-4">
                            <label className="block mb-1 text-sm font-semibold">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/
                                })}
                                className="input input-bordered w-full"
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

                        {
                            errorMessage.message &&
                            <p className='text-red-600 text-xs mb-3'>
                                {errorMessage.message}
                            </p>
                        }

                        <button type="submit" className="btn btn-primary w-full mb-4">
                            Register
                        </button>
                    </form>
                    <p className="text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-red-600 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
