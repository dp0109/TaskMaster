import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register({ name, email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100"
            >
                <h2 className="text-3xl font-bold text-center text-slate-800">Create Account</h2>
                <p className="text-center text-slate-500">Join TaskMaster today</p>

                {error && <div className="p-3 text-red-500 bg-red-100 rounded-lg text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
