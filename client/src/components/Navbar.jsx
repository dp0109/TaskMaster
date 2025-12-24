import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FiLogOut, FiCheckSquare } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <FiCheckSquare className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                                TaskMaster
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <span className="text-sm text-slate-600">
                                Welcome, <span className="font-semibold text-slate-800">{user?.name}</span>
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-500 hover:text-red-600 transition-colors rounded-full hover:bg-slate-100"
                            title="Logout"
                        >
                            <FiLogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
