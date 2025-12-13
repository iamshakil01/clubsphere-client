import { Link, NavLink, Outlet, Navigate } from "react-router";
import { CiUser, CiCalendar, CiBoxList } from "react-icons/ci";
import { FaRegCreditCard, FaHome } from "react-icons/fa";
import { IoManSharp } from "react-icons/io5";
import { GiCard10Clubs } from "react-icons/gi";
import { FcApprove } from "react-icons/fc";
import useRole from "../hooks/useRole";



const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-white shadow px-4 py-3">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="text-sm font-semibold capitalize">
          {role === "clubManager" ? "Club Manager" : role}
        </div>
      </nav>


      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="flex flex-col bg-white shadow-sm w-16 lg:w-20">
          <ul className="flex flex-col items-center space-y-3 py-4">

            {/* Homepage */}
            <li className="group relative w-full flex justify-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-black text-xl"
              >
                <FaHome />
              </Link>
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Homepage
              </span>
            </li>


            {/* Admin Links */}
            {role === "admin" && (
              <>
                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/users-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiUser />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Users Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <GiCard10Clubs />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management?filter=pending"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiBoxList />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Pending Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management?filter=approved"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FcApprove />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Approved Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/memberships-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <IoManSharp />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Memberships
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/events-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiCalendar />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Events-Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/payment-history"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FaRegCreditCard />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Payments
                  </span>
                </li>
              </>
            )}


            {/* Club Manager Links */}
            {role === "clubManager" && (
              <>
                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <GiCard10Clubs />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    My Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/events-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiCalendar />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Events-Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/payment-history"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FaRegCreditCard />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Payments
                  </span>
                </li>
              </>
            )}


            {/* Member Links */}
            {role === "member" && (
              <li className="group relative w-full flex justify-center">
                <NavLink
                  to="/dashboard/payment-history"
                  className="text-gray-700 hover:text-black text-xl"
                >
                  <FaRegCreditCard />
                </NavLink>
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Payments
                </span>
              </li>
            )}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-5xl text-center font-bold my-5">Welcome To Your Dashboard</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
