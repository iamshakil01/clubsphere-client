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
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {filteredClubs.map(club => (
    <div
      key={club._id}
      className="group relative bg-white rounded-3xl shadow-lg border border-transparent hover:border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={club.image}
          alt={club.clubName}
          className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 group-hover:opacity-50 transition"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors underline-offset-2 group-hover:underline">
          {club.clubName}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {club.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {club.category}
          </span>

          <span
            className={`text-sm font-semibold ${
              club.membershipFee === 0
                ? "text-green-600 bg-green-100 px-2 py-1 rounded-full"
                : "text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full"
            }`}
          >
            {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
          </span>
        </div>

        <Link
          to={`/clubs/${club._id}`}
          className="inline-block w-full text-center text-white bg-green-600 hover:bg-green-700 font-semibold py-2 rounded-xl transition transform hover:-translate-y-0.5"
        >
          View Details
        </Link>
      </div>

      {/* Decorative Accent */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
    </div>
  ))}
</div>

        </div>
    );
};

export default AllClubs;
