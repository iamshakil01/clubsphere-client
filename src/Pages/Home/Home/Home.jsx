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
                <h2 className="text-3xl font-bold text-center mb-10">Popular Clubs</h2>

                {isLoading ? (
                    <p className="text-center">Loading clubs...</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {clubs.slice(0, 6).map(club => (
                            <div
                                key={club._id}
                                className="group relative bg-white rounded-3xl shadow-lg border border-transparent hover:border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={club.image}
                                        alt={club.clubName}
                                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 group-hover:opacity-50 transition"></div>
                                </div>

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
                                            className={`text-sm font-semibold ${club.membershipFee === 0
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

                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="bg-gradient-to-tr from-green-50 to-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">

                    {/* Trusted Clubs */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-200 p-4 rounded-full shadow-lg group-hover:bg-green-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Trusted Clubs</h3>
                        <p className="text-gray-600 mt-3">Verified and secure community clubs.</p>
                    </div>

                    {/* Easy Management */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-200 p-4 rounded-full shadow-lg group-hover:bg-blue-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zM3 9a1 1 0 100 2h14a1 1 0 100-2H3zM3 14a1 1 0 100 2h14a1 1 0 100-2H3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Easy Management</h3>
                        <p className="text-gray-600 mt-3">Manage clubs and events effortlessly.</p>
                    </div>

                    {/* Secure Payments */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-200 p-4 rounded-full shadow-lg group-hover:bg-yellow-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h12v2H4v-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Secure Payments</h3>
                        <p className="text-gray-600 mt-3">Stripe protected transactions.</p>
                    </div>

                </div>
            </section>


            <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white text-center overflow-hidden mb-5">
                {/* Decorative Light Blobs */}
                <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                <div className="relative max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                        Ready to Join Your Community?
                    </h2>

                    <p className="mt-4 text-indigo-100 text-lg lg:text-xl">
                        Sign up today and become part of something amazing.
                    </p>

                    <Link
                        to="/register"
                        className="mt-8 inline-block bg-white text-indigo-600 font-semibold text-lg px-8 py-3 rounded-full shadow-xl hover:bg-indigo-50 hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-300"
                    >
                        Create Account
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Home;
