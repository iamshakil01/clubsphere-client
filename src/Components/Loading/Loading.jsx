import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-[9999]">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                {message && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Loading;
