import { useState, useEffect } from 'react';
import { FiPlus, FiFilter, FiList, FiBarChart2, FiCalendar, FiZap } from 'react-icons/fi';
import { taskService } from '../services/api';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CalendarView from '../components/CalendarView';
import AnalyticsView from '../components/AnalyticsView';
import MomentumView from '../components/MomentumView';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [viewMode, setViewMode] = useState('list'); // list, calendar, analytics, momentum

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const data = await taskService.getAll();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const newTask = await taskService.create(taskData);
            setTasks([newTask, ...tasks]);
            setIsFormOpen(false);
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const updatedTask = await taskService.update(editingTask._id, taskData);
            setTasks(tasks.map(t => t._id === editingTask._id ? updatedTask : t));
            setIsFormOpen(false);
            setEditingTask(null);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    // Wrapper for direct updates (e.g. from Momentum View)
    const handleDirectUpdate = async (id, updates) => {
        try {
            const updatedTask = await taskService.update(id, updates);
            setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
        } catch (error) {
            console.error('Failed to update task', error);
        }
    }

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.delete(id);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (error) {
                console.error('Failed to delete task', error);
            }
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            const updatedTask = await taskService.update(task._id, { status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
        } catch (error) {
            console.error('Failed to toggle status', error);
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    const pendingCount = tasks.filter(t => t.status === 'pending').length;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
                        <p className="text-slate-500 mt-1">
                            You have <span className="font-semibold text-primary-600">{pendingCount}</span> pending tasks
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View Toggles */}
                        <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                title="List View"
                            >
                                <FiList />
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Calendar View"
                            >
                                <FiCalendar />
                            </button>
                            <button
                                onClick={() => setViewMode('momentum')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'momentum' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Momentum Mode"
                            >
                                <FiZap />
                            </button>
                            <button
                                onClick={() => setViewMode('analytics')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'analytics' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Analytics View"
                            >
                                <FiBarChart2 />
                            </button>
                        </div>

                        {viewMode === 'list' && (
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                    <FiFilter className="w-4 h-4" />
                                    <span className="capitalize">{filter}</span>
                                </button>
                                {/* Simple Dropdown for Filter */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 p-1 hidden group-hover:block z-20">
                                    {['all', 'pending', 'completed'].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize ${filter === f ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openCreateModal}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>New Task</span>
                        </motion.button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {viewMode === 'list' && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TaskList
                                tasks={filteredTasks}
                                onToggleStatus={handleToggleStatus}
                                onEdit={openEditModal}
                                onDelete={handleDeleteTask}
                                isLoading={isLoading}
                            />
                        </motion.div>
                    )}

                    {viewMode === 'calendar' && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CalendarView tasks={tasks} onEdit={openEditModal} />
                        </motion.div>
                    )}

                    {viewMode === 'momentum' && (
                        <motion.div
                            key="momentum"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MomentumView tasks={tasks} onUpdate={handleDirectUpdate} />
                        </motion.div>
                    )}

                    {viewMode === 'analytics' && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <AnalyticsView tasks={tasks} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <TaskForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                initialData={editingTask}
            />
        </div>
    );
};

export default Dashboard;
