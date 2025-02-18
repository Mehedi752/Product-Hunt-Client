import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const Coupons = () => {
    const { register, handleSubmit, reset } = useForm();
    const [coupons, setCoupons] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const axiosPublic = useAxiosPublic();

    // Fetch coupons from the server
    const { data: couponCards = [], refetch } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        },
    });

    useEffect(() => {
        setCoupons(couponCards);
    }, [couponCards]);

    // Add new coupon
    const onSubmit = async (data) => {
        if (isEditing) {
            axiosPublic.put(`/coupons/update/${editingCoupon._id}`, data)
                .then((res) => {
                    console.log(res);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Coupon updated successfully.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                    refetch();
                })
                .catch((error) => {
                    console.error('Error updating coupon:', error);
                });
        }
        else {
            axiosPublic.post('/coupons', data)
                .then((res) => {
                    console.log(res);
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Coupon added successfully.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                    refetch();
                })
                .catch((error) => {
                    console.error('Error adding coupon:', error);
                });
        }
        // reset();
        setIsEditing(false);
        setEditingCoupon(null);

        // Fetch updated coupons
        const response = await axiosPublic.get('/coupons');
        setCoupons(response.data);
    };

    // Edit coupon
    const editCoupon = (coupon) => {
        setIsEditing(true);
        setEditingCoupon(coupon);
        reset({
            code: coupon.code,
            expiryDate: coupon.expiryDate,
            description: coupon.description,
            discountAmount: coupon.discountAmount,
        });
    };

    // Delete coupon
    const deleteCoupon = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this coupon!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/coupons/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Coupon deleted successfully.',
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })
                    .catch((error) => {
                        console.error('Error deleting coupon:', error);
                    });
            }
        });

    };

    return (
        <div className="container mx-auto lg:px-12">
            <h1 className="text-3xl text-center font-semibold mb-6">{isEditing ? 'Edit Coupon' : 'Add Coupon'}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
                <div className="mb-4">
                    <label className="block mb-2">Coupon Code</label>
                    <input
                        {...register('code', { required: true })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Expiry Date</label>
                    <input
                        {...register('expiryDate', { required: true })}
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Coupon Description</label>
                    <input
                        {...register('description', { required: true })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Discount Amount</label>
                    <input
                        {...register('discountAmount', { required: true })}
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary text-white px-4 py-2 rounded-md"
                >
                    {isEditing ? 'Update Coupon' : 'Add Coupon'}
                </button>
            </form>

            <h2 className="text-2xl font-semibold mb-4">Existing Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{coupon.code}</h3>
                            <span className="text-sm text-gray-500">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                        </div>

                        <p className="text-gray-600 text-base mb-4">{coupon.description}</p>

                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-lg font-semibold text-green-500">{coupon.discountAmount}% OFF</span>
                            <span className="text-sm font-medium text-gray-500">Discount</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => editCoupon(coupon)}
                                className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCoupon(coupon._id)}
                                className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Coupons;
