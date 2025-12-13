import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('User logged out successfully');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-green-500 font-semibold"
            : "text-gray-700 hover:text-primary";

    const links = (
        <>
            <li><NavLink to='/' className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to='/all-clubs' className={navLinkClass}>All Clubs</NavLink></li>

            {
                role == 'clubManager' &&
                <>
                <li><NavLink to='/create-club' className={navLinkClass}>Create Club</NavLink></li>
                <li><NavLink to='/create-events' className={navLinkClass}>Create Event</NavLink></li>
                </>
            }

            <li><NavLink to='/events' className={navLinkClass}>Events</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {links}

                        {!user ? (
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to='/profile'>Profile</Link></li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><a onClick={handleLogOut}>Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>

                <span className="btn btn-ghost text-xl"><Logo /></span>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={user.photoURL || 'https://i.ibb.co/6rW81yM/user-default.png'}
                                    title={user.displayName || user.email}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            <li><a onClick={handleLogOut}>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <div className='flex items-center space-x-2'>
                        <Link to={'/login'} className="btn">Login</Link>
                        <Link to={'/register'} className="btn btn-secondary">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
