import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <h1 className="text-9xl font-bold text-primary-200">404</h1>
                <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
                <p className="text-slate-500 mt-2 mb-8">The page you are looking for does not exist.</p>

                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                >
                    Go Home
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;
