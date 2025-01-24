import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';



const AddProduct = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: currentUser = [], refetch } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    });
    console.log(currentUser);

    const [tags, setTags] = useState([]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, { id: tag.id || tag.text, text: tag.text }]); // Add new tag object
    };



    const onSubmit = (data) => {
        if (currentUser?.isSubscribed === false && currentUser?.productAddCount >= 1) {
            Swal.fire({
                icon: 'error',
                title: 'Subscription Required',
                text: 'Please subscribe to add more products',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/dashboard/user/profile');
            return;
        }

        const productData = {
            ...data,
            ownerName: user?.displayName || 'Anonymous',
            ownerImage: user?.photoURL || '/default-avatar.png',
            ownerEmail: user?.email,
            tags: tags.map(tag => tag.text),
            timestamp: new Date(), // Save current timestamp
            status: 'pending', // Set status to pending by default
            upvotes: 0, // Set upvotes to 0 by default
            voters: [], // Set voters to empty array by default
        };

        //Save product data to the database
        axiosPublic.post('/products', productData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added',
                        text: 'Your product has been added successfully',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                refetch();
                axiosPublic.patch(`/users/countProductAdd/${user?.email}`)
                    .then((res) => {
                        console.log(res);
                        refetch();
                        navigate('/dashboard/user/myProducts');
                    })
                    .catch((error) => {
                        console.error('Error updating product count:', error);
                    });
            })
            .catch(error => console.error(error));

    };

    return (
        <div className="container mx-auto lg:p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto">
                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Product name is required' })}
                        className={`input input-bordered w-full ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Product Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block font-medium mb-1">Product Image</label>
                    <input
                        type="url"
                        id="image"
                        {...register('image', { required: 'Product image is required' })}
                        className={`input input-bordered w-full ${errors.image ? 'border-red-500' : ''}`}
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        className={`textarea textarea-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Owner Info */}
                <div className="mb-4">
                    <label htmlFor="owner" className="block font-medium mb-1">Owner Info</label>
                    <input
                        type="text"
                        id="ownerName"
                        value={user?.displayName || 'Anonymous'}
                        disabled
                        className="input input-bordered w-full bg-gray-100"
                    />
                    <input
                        type="email"
                        id="ownerEmail"
                        value={user?.email}
                        disabled
                        className="input input-bordered w-full bg-gray-100 mt-2"
                    />

                    <input
                        type='url'
                        id='ownerImage'
                        value={user?.photoURL || '/default-avatar.png'}
                        disabled
                        className="input input-bordered w-full bg-gray-100 mt-2"
                    />

                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label htmlFor="tags" className="block font-medium mb-1">Tags</label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        delimiters={delimiters}
                        inputFieldPosition="bottom"
                        maxTags={7}
                        placeholder="Add new tag"
                        className="border rounded p-2"
                    />
                </div>

                {/* External Links */}
                <div className="mb-4">
                    <label htmlFor="externalLink" className="block font-medium mb-1">External Link</label>
                    <input
                        type="url"
                        id="externalLink"
                        {...register('externalLink')}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full text-white">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
