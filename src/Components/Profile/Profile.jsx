import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Profile = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">


                <div className="bg-green-600 text-white py-6 px-8">
                    <h1 className="text-5xl font-bold">Your Profile</h1>
                </div>

                <div className="flex flex-col md:flex-row md:items-start p-8 gap-10">


                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-40 h-40 rounded-full ring-8 ring-white shadow-lg overflow-hidden">
                            <img
                                src={user.photoURL || "https://i.ibb.co/6rW81yM/user-default.png"}
                                alt="Profile Avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-gray-800 uppercase bg-yellow-400 px-4 py-2 rounded-full shadow-inner">
                            {role}
                        </p>
                    </div>

                    {/* User Details Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 space-y-6">

                        {/* Name & Email */}
                        <div className="space-y-2">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Full Name</h3>
                                <p className="text-3xl font-bold text-gray-900">{user.displayName}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Email Address</h3>
                                <p className="text-xl text-gray-900">{user.email}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Joined ClubSphere On</h3>
                                <p className="text-md text-gray-600">
                                    {user.metadata?.creationTime}
                                </p>
                            </div>
                        </div>

                        {/* Manage Info */}
                        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-sm">
                            <p className="font-semibold text-green-700 text-lg">
                                Manager Status
                            </p>
                            <p className="text-md text-green-600">
                                You manage <span className="font-bold">1</span> club(s).
                                Access and manage them from the Dashboard.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
