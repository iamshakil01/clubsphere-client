import { Link } from "react-router";
import Banner from "../Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import FeaturedClub from "../Banner/FeaturedClub/FeaturedClub";

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ["clubs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/clubs");
            return res.data;
        }
    });



    return (
        <div className="bg-white">
            <Banner />
            <FeaturedClub></FeaturedClub>

            <section className="py-8 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Popular Clubs
                </h2>

                {
                    isLoading ? (
                        <p className="text-center">Loading clubs...</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {clubs.slice(0, 6).map(club => (
                                <div key={club._id} className="bg-white rounded-xl shadow hover:shadow-lg transition">

                                    <img
                                        src={club.image}
                                        alt={club.clubName}
                                        className="h-48 w-full object-cover rounded-t-xl"
                                    />

                                    <div className="p-5 space-y-2">
                                        <h2 className="text-xl font-semibold">{club.clubName}</h2>

                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {club.description}
                                        </p>

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
                    )}
            </section>

            {/* Why Join */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-bold">Trusted Clubs</h3>
                        <p className="text-gray-600 mt-2">Verified and secure community clubs.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-bold">Easy Management</h3>
                        <p className="text-gray-600 mt-2">Manage clubs and events effortlessly.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-bold">Secure Payments</h3>
                        <p className="text-gray-600 mt-2">Stripe protected transactions.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-indigo-500 text-white text-center mb-5">
                <h2 className="text-3xl font-bold">
                    Ready to Join Your Community?
                </h2>
                <p className="mt-3 text-indigo-100">
                    Sign up today and become part of something amazing.
                </p>
                <Link to="/register" className="btn btn-white mt-6">
                    Create Account
                </Link>
            </section>
        </div>
    );
};

export default Home;
