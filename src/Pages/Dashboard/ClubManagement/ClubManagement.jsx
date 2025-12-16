import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const ClubsManagement = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const [editingClub, setEditingClub] = useState(null);

    const { register, handleSubmit, reset, watch } = useForm();
    const bannerPreview = watch("bannerImage");

    const filter = new URLSearchParams(location.search).get("filter");

    
    const {
        data: clubs = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ["clubs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/clubs-management");
            return res.data;
        }
    });

    
    const handleStatusChange = async (id, status) => {
        try {
            const res = await axiosSecure.patch(
                `/dashboard/clubs-management/${id}/status`,
                { status }
            );
            if (res.data.modifiedCount > 0) refetch();
        } catch (err) {
            console.error(err);
        }
    };

    
    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(
                `/dashboard/clubs-management/${id}`
            );
            if (res.data.deletedCount > 0) refetch();
        } catch (err) {
            console.error(err);
        }
    };

    
    const openEditForm = (club) => {
        setEditingClub(club);
        reset({
            clubName: club.clubName,
            description: club.description,
            location: club.location,
            membershipFee: club.membershipFee,
            category: club.category,
            bannerImage: club.bannerImage
        });
    };

    const onSubmit = async (data) => {
        try {
            if (!data.bannerImage?.trim()) delete data.bannerImage;

            const res = await axiosSecure.patch(
                `/dashboard/clubs-management/${editingClub._id}`,
                data
            );

            if (res.data.modifiedCount > 0) {
                setEditingClub(null);
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <Loading />;

    const filtered = filter
        ? clubs.filter(c => c.status === filter)
        : clubs;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
                Total Clubs: {clubs.length}
            </h2>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-center">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((club, i) => (
                            <tr key={club._id} className="border-b">
                                <td>{i + 1}</td>
                                <td>{club.clubName}</td>
                                <td>{club.createdBy}</td>
                                <td>{club.status}</td>
                                <td>{club.membershipFee}</td>
                                <td className="space-x-1 py-2">
                                    {club.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(club._id, "approved")
                                                }
                                                className="bg-green-600 text-white px-2 py-1 rounded"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(club._id, "rejected")
                                                }
                                                className="bg-red-600 text-white px-2 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => openEditForm(club)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(club._id)}
                                        className="bg-gray-700 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* edit modal */}
            {editingClub && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded w-96">
                        <h3 className="text-xl font-bold mb-3">Edit Club</h3>

                        {bannerPreview && (
                            <img
                                src={bannerPreview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded mb-3"
                                onError={(e) =>
                                (e.target.src =
                                    "https://via.placeholder.com/600x300")
                                }
                            />
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <input {...register("clubName")} className="input" />
                            <input {...register("description")} className="input" />
                            <input {...register("location")} className="input" />
                            <input type="number" {...register("membershipFee")} className="input" />
                            <input {...register("category")} className="input" />
                            <input
                                {...register("bannerImage")}
                                placeholder="Banner Image URL"
                                className="input"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingClub(null)}
                                    className="bg-gray-400 px-3 py-1 rounded text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 px-3 py-1 rounded text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubsManagement;
