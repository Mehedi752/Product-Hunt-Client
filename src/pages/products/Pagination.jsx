import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center items-center mt-6">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline'} mx-1`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
