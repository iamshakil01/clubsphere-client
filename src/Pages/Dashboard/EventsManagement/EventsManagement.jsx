import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const EventsManagement = ({ clubId }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: events = [], isLoading, isError, error } = useQuery({
        queryKey: ["events", clubId],
        queryFn: async () => {
            let url = "/events";
            if (clubId) url += `?clubId=${clubId}`;
            const res = await axiosSecure.get(url);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center text-lg font-semibold">Error: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-extrabold text-gray-800">
                    {clubId ? "Club Events" : "All Events"} ({events.length})
                </h2>
                <button
                    onClick={() => navigate("/create-events")}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition"
                >
                    + Create Event
                </button>
            </div>

            {events.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No events found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                    <table className="w-full table-auto border-collapse text-gray-700">
                        <thead className="bg-indigo-600 text-white text-sm font-semibold sticky top-0">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Paid?</th>
                                <th className="px-4 py-3">Fee</th>
                                <th className="px-4 py-3">Max Attendees</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map((e, idx) => (
                                <tr
                                    key={e._id}
                                    className="border-b hover:bg-indigo-50 transition-colors duration-200"
                                >
                                    <td className="px-4 py-3 font-medium">{idx + 1}</td>
                                    <td className="px-4 py-3">{e.title}</td>
                                    <td className="px-4 py-3 max-w-xs truncate">{e.description}</td>
                                    <td className="px-4 py-3">{new Date(e.date).toLocaleString()}</td>
                                    <td className="px-4 py-3">{e.location}</td>
                                    <td className="px-4 py-3 font-semibold text-center">
                                        {e.price > 0 ? (
                                            <span className="text-yellow-600">Yes</span>
                                        ) : (
                                            <span className="text-green-600">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {e.price > 0 ? (
                                            <span className="font-semibold text-indigo-700">${e.price}</span>
                                        ) : (
                                            <span className="text-gray-500">---</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center font-medium">{e.maxAttendees}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventsManagement;
