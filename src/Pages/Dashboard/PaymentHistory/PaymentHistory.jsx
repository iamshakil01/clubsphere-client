import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ["payments-all"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center font-semibold">Error: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Payments & Transactions ({payments.length})
            </h2>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="w-full table-auto text-sm text-left border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-3 font-semibold">#</th>
                            <th className="px-4 py-3 font-semibold">User Email</th>
                            <th className="px-4 py-3 font-semibold">Club Name</th>
                            <th className="px-4 py-3 font-semibold">Amount</th>
                            <th className="px-4 py-3 font-semibold">Type</th>
                            <th className="px-4 py-3 font-semibold">Date</th>
                            <th className="px-4 py-3 font-semibold">Transaction ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((p, idx) => (
                            <tr
                                key={p._id}
                                className="border-b hover:bg-indigo-50 transition-colors duration-200"
                            >
                                <td className="px-4 py-3 font-medium text-gray-700">{idx + 1}</td>
                                <td className="px-4 py-3 text-gray-600">{p.customerEmail}</td>
                                <td className="px-4 py-3 text-gray-600">{p.clubName}</td>
                                <td className="px-4 py-3 text-indigo-700 font-semibold">${p.amount}</td>
                                <td className="px-4 py-3 text-gray-700 capitalize">
                                    {p.type || p.paymentType || "membership"}
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    {new Date(p.paidAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-indigo-600 font-mono text-xs">
                                    {p.transactionId}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
