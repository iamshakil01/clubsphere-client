import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const ClubsManagement = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");

    const { data: clubs = [], isLoading, refetch, } = useQuery({
        queryKey: ["clubs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/clubs-management");
            return res.data;
        }
    });

    const handleStatusChange = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/dashboard/clubs-management/${id}/status`, { status });
            if (res.data.modifiedCount > 0) {
                await refetch();
            }
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    if (isLoading) return <Loading />;
    
    const filtered = filter ? clubs.filter(c => c.status === filter) : clubs;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800">
                TOTAL CLUBS ({clubs.length}){" "}
                {filter && `– ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            </h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full table-auto border-collapse text-gray-700">
                    <thead className="bg-indigo-600 text-white text-sm font-semibold sticky top-0">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Club Name</th>
                            <th className="px-4 py-3">Created By</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Membership Fee</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((club, idx) => {
                            const isApproved = club.status === "approved";
                            const isRejected = club.status === "rejected";
                            return (
                                <tr
                                    key={club._id}
                                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="px-4 py-3 text-center font-medium">
                                        {idx + 1}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {club.clubName}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {club.createdBy}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                isApproved
                                                    ? "bg-green-100 text-green-800"
                                                    : isRejected
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {club.status.toUpperCase()}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center font-semibold text-indigo-700">
                                        {club.membershipFee}
                                    </td>

                                    <td className="px-4 py-3 text-center space-x-2">
                                        {club.status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(club._id, "approved")}
                                                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-500 transition"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() => handleStatusChange(club._id, "rejected")}
                                                    className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-500 transition"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-500 text-sm">—</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClubsManagement;
