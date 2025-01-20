import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-700">Price: ${product.price}</span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
