import React from 'react';
import { Link, useNavigate } from 'react-router';

const ErrorPage = ({
  status = 404, 
  message = "Oops! The page you're looking for doesn't exist."
}) => {
  const navigate = useNavigate();
  const statusText = String(status === 404 ? "404" : status);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-9xl font-extrabold text-primary mb-4">{statusText}</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="btn btn-outline btn-lg"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="btn btn-secondary btn-lg"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
