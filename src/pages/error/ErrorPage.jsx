import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="text-center">
        {/* 404 Number with Slide-in animation */}
        <h1 className="text-8xl font-extrabold text-white animate__animated animate__fadeInUp">
          404
        </h1>

        {/* Error Message with fade-in animation */}
        <p className="text-xl text-white mt-4 animate__animated animate__fadeIn animate__delay-300">
          Oops! The page you're looking for doesn't exist.
        </p>

        <p className="text-sm text-white mt-2 animate__animated animate__fadeIn animate__delay-500">
          It seems the page is either missing or was moved.
        </p>

        {/* Go Back Button with hover effect */}
        <div className="mt-6">
          <Link
            to="/"
            className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transform transition-all hover:scale-105"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
