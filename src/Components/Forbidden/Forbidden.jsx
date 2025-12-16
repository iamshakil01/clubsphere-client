import React from "react";
import { Link } from "react-router";
import { BiLock } from "react-icons/bi";

const Forbidden = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-6">
      

      <div className="absolute -top-20 -left-24 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
      <div className="absolute top-10 right-12 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>


      <div className="relative text-center space-y-6">
        
        
        <div className="mx-auto text-9xl text-yellow-300 animate-bounce">
          <BiLock />
        </div>


        <h1 className="text-6xl font-extrabold animate-fadeIn">
          403 Forbidden
        </h1>


        <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto animate-fadeIn delay-200">
          You don’t have permission to access this page.
          If you think this is a mistake, contact your administrator.
        </p>


        <Link
          to="/"
          className="
            inline-block bg-white text-indigo-900 font-semibold px-6 py-3 rounded-lg
            shadow-lg hover:bg-gray-100 hover:scale-105 transform transition
            animate-fadeIn delay-400
          "
        >
          Go to Homepage
        </Link>

      </div>
    </div>
  );
};

export default Forbidden;
