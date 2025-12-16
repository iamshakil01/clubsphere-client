import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Admin = () => {
  const axiosSecure = useAxiosSecure();
  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin");
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/dashboard/users-management"
          className="
                group block bg-base-200 p-6 rounded-xl shadow-md 
                hover:shadow-2xl transition-shadow duration-300 
                transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
              ">
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            Total Users
          </p>
          <p className="text-3xl font-bold">{admin.totalUsers}</p>
        </Link>

        {/* Total Clubs (all) */}
        <Link to="/dashboard/clubs-management"
          className="
                group block bg-base-200 p-6 rounded-xl shadow-md 
                hover:shadow-2xl transition-shadow duration-300 
                transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
              ">
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            Total Clubs
          </p>
          <p className="text-3xl font-bold">{admin.totalClubs}</p>
        </Link>

        {/* Pending Clubs */}
        <Link to="/dashboard/clubs-management?filter=pending"
          className="
                group block bg-base-200 p-6 rounded-xl shadow-md 
                hover:shadow-2xl transition-shadow duration-300 
                transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
              ">
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            Pending Clubs
          </p>
          <p className="text-3xl font-bold">{admin.pendingClubs}</p>
        </Link>

        {/* Approved Clubs */}
        <Link to="/dashboard/clubs-management?filter=approved"
          className="
                group block bg-base-200 p-6 rounded-xl shadow-md 
                hover:shadow-2xl transition-shadow duration-300 
                transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
              ">
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            Approved Clubs
          </p>
          <p className="text-3xl font-bold">{admin.approvedClubs}</p>
        </Link>

        {admin.totalMemberships != null && (
          <Link to="/dashboard/memberships-management"
            className="
                  group block bg-base-200 p-6 rounded-xl shadow-md 
                  hover:shadow-2xl transition-shadow duration-300 
                  transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
                ">
            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
              Total Memberships
            </p>
            <p className="text-3xl font-bold">{admin.totalMemberships}</p>
          </Link>
        )}

        {admin.totalEvents != null && (
          <Link to="/dashboard/events-management"
            className="
                  group block bg-base-200 p-6 rounded-xl shadow-md 
                  hover:shadow-2xl transition-shadow duration-300 
                  transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
                ">
            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
              Total Events
            </p>
            <p className="text-3xl font-bold">{admin.totalEvents}</p>
          </Link>
        )}

        <Link to="/dashboard/payment-history"
          className="
         group block bg-base-200 p-6 rounded-xl shadow-md 
         hover:shadow-2xl transition-shadow duration-300 
         transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
      ">
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            Total Payments
          </p>
          <p className="text-3xl font-bold">${admin.totalPayments}</p>
        </Link>

      </div>
    </div>
  );
};

export default Admin;
