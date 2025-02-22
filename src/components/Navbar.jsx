import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authprovider";

const Navbar = () => {
    const {user, handleSignOut} = useContext(AuthContext)

    const handleLogout = () => {
        handleSignOut()
    }

    const links = <>
        <Link to='/'><li className="px-2">Home</li></Link>
        <Link to='addTask'><li>Add Task</li></Link>
    </>

    return (
        <div className="bg-gray-300">
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="text-2xl font-bold">TasKit</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-3 text-xl">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button onClick={handleLogout} className="btn btn-secondary text-xl">Logout</button>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary text-xl">Sign In</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar