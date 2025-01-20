import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();


    const product = useLoaderData();
    console.log(product);

    // Handle form submission
    const onSubmit = (data) => {
        axiosPublic.put(`/products/${id}`, data)
            .then((res) => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Product Updated Successfully",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    })
                }
                navigate('/dashboard/user/myProducts'); // Redirect back to My Products page
            })
            .catch((error) => {
                console.error(error);
                Swal.fire('Error', 'Failed to update the product.', 'error');
            });
    };


    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold text-center mb-6">Update Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-10 rounded-lg max-w-lg mx-auto">
                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={product.name}
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
                        defaultValue={product.image}
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
                        defaultValue={product.description}
                        {...register('description', { required: 'Description is required' })}
                        className={`textarea textarea-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* External Link */}
                <div className="mb-4">
                    <label htmlFor="externalLink" className="block font-medium mb-1">External Link</label>
                    <input
                        type="url"
                        defaultValue={product.externalLink}
                        id="externalLink"
                        {...register('externalLink')}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full text-white">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
