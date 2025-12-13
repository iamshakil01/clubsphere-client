import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [type, setType] = useState("all");
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get("/clubs")
            .then(res => setClubs(res.data));
    }, [axiosSecure]);

    const filteredClubs = clubs.filter(club => {
        return (
            club.clubName.toLowerCase().includes(search.toLowerCase()) &&
            (category === "all" || club.category === category) &&
            (type === "all" ||
                (type === "free" && club.membershipFee === 0) ||
                (type === "paid" && club.membershipFee > 0))
        );
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Explore Clubs</h1>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search clubs..."
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option>Photography</option>
                    <option>Tech</option>
                    <option>Sports</option>
                    <option>Book Club</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                </select>
            </div>

            {/* Club Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map(club => (
                    <div key={club._id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
                        <img
                            src={club.image}
                            alt={club.clubName}
                            className="h-48 w-full object-cover rounded-t-xl transition"
                        />

                        <div className="p-5 space-y-2">
                            <h2 className="text-xl font-semibold">{club.clubName}</h2>
                            <p className="text-sm text-gray-600 line-clamp-2">{club.description}</p>
                            <p className="text-sm font-medium">
                                {club.membershipFee === 0 ? "✅ Free" : `💳 $${club.membershipFee}`}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {club.category}
                                </span>

                                <Link to={`/clubs/${club._id}`} className="btn btn-sm btn-secondary">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClubs;
