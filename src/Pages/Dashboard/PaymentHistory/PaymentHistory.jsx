// PaymentsManagement.jsx
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
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">All Payments / Transactions ({payments.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Club Name</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p, idx) => (
                            <tr key={p._id}>
                                <th>{idx + 1}</th>
                                <td>{p.customerEmail}</td>
                                <td>{p.clubName}</td>
                                <td>${p.amount}</td>
                                <td>{p.type || p.paymentType || "membership"}</td>
                                <td>{new Date(p.paidAt).toLocaleString()}</td>
                                <td>{p.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
