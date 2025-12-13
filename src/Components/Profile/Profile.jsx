import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Profile = () => {
    const { user } = useAuth();
    const { role } = useRole();


    return (
        <div className="p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                    <h2 className="text-4xl font-bold text-gray-800">Your Profile</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="flex flex-col items-center">
                        <div className="avatar mb-4">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="Profile Avatar" />
                            </div>
                        </div>

                        {/* Show role text correctly */}
                        <p className="badge badge-warning text-white font-semibold capitalize">
                            {role}
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Full Name</h3>
                                <p className="text-xl font-extrabold text-gray-900">{user.displayName}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Email Address:</h3>
                                <p className="text-xl text-gray-900">{user.email}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Join ClubSphere On:</h3>
                                <p className="text-md text-gray-600">{user.metadata?.creationTime}</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                            <p className="font-semibold text-yellow-700">Manager Status:</p>
                            <p className="text-sm text-yellow-600">
                                You manage **1** club(s). View and manage them in the Dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
