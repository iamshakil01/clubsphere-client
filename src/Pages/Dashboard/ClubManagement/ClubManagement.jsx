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

    if (isLoading) return <Loading></Loading>;

    const filtered = filter ? clubs.filter(c => c.status === filter) : clubs;

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">
                TOTAL-CLUBS ({clubs.length}) {filter ? `– ${filter.charAt(0).toUpperCase() + filter.slice(1)}` : ""}
            </h2>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-center">#</th>
                        <th className="border px-4 py-2 text-center">Club Name</th>
                        <th className="border px-4 py-2 text-center">Created By</th>
                        <th className="border px-4 py-2 text-center">Status</th>
                        <th className="border px-4 py-2 text-center">Membership Fee</th>
                        <th className="border px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((club, idx) => {
                        const isApproved = club.status === "approved";
                        return (
                            <tr
                                key={club._id}
                                className={isApproved ? "bg-blue-100" : ""}
                            >
                                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                <td className="border px-4 py-2 text-center">{club.clubName}</td>
                                <td className="border px-4 py-2 text-center">{club.createdBy}</td>
                                <td className="border px-4 py-2 text-center">{club.status}</td>
                                <td className="border px-4 py-2 text-center">{club.membershipFee}</td>
                                <td className="border px-4 py-2 text-center">
                                    {club.status === "pending" ? (
                                        <>
                                            <button
                                                className="btn btn-sm mr-2 text-green-500"
                                                onClick={() => handleStatusChange(club._id, "approved")}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleStatusChange(club._id, "rejected")}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span>—</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ClubsManagement;
