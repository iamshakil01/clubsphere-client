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
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    {clubId ? "Club Events" : "All Events"} ({events.length})
                </h2>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/create-events")}
                >
                    + Create Event
                </button>
            </div>

            {events.length === 0 ? (
                <p className="text-center text-gray-600">No events found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Paid?</th>
                                <th>Fee</th>
                                <th>Max Attendees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((e, idx) => (
                                <tr key={e._id}>
                                    <td>{idx + 1}</td>
                                    <td>{e.title}</td>
                                    <td className="max-w-xs truncate">{e.description}</td>
                                    <td>{new Date(e.date).toLocaleString()}</td>
                                    <td>{e.location}</td>
                                    <td>{e.price > 0 ? "Yes" : "No"}</td>
                                    <td>{e.price > 0 ? `$${e.price}` : "---"}</td>
                                    <td>{e.maxAttendees}</td>
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
