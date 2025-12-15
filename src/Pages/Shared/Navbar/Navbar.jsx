import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();

    const handleLogOut = () => {
        logOut()
            .then(() => console.log("User logged out successfully"))
            .catch((error) => console.log(error));
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-green-500 font-semibold border-b-2 border-green-500 transition-all"
            : "text-gray-700 hover:text-green-500 transition-all";

    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-clubs" className={navLinkClass}>
                    All Clubs
                </NavLink>
            </li>

            {role === "clubManager" && (
                <>
                    <li>
                        <NavLink to="/create-club" className={navLinkClass}>
                            Create Club
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-events" className={navLinkClass}>
                            Create Event
                        </NavLink>
                    </li>
                </>
            )}

            <li>
                <NavLink to="/events" className={navLinkClass}>
                    Events
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-white shadow-lg sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden text-xl text-gray-700 hover:text-green-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-box shadow-xl mt-3 w-56 p-2"
                    >
                        {links}
                        {!user ? (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogOut}>Logout</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <span to="/" className="btn btn-ghost normal-case text-2xl font-bold text-green-600">
                    <Logo />
                </span>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
            </div>

            <div className="navbar-end space-x-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar hover:bg-green-100"
                        >
                            <div className="w-10 rounded-full ring ring-green-300 ring-offset-2">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/6rW81yM/user-default.png"}
                                    alt={user.displayName || user.email}
                                    title={user.displayName || user.email}
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box shadow-xl mt-3 w-52 p-2"
                        >
                            <li>
                                <Link to="/profile" className="hover:text-green-500">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-green-500">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <a onClick={handleLogOut} className="hover:text-red-500">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link className="btn btn-outline btn-sm hover:bg-green-50 hover:border-green-500" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-secondary btn-sm text-white" to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
