import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiFlag, FiTag } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || '');
            setPriority(initialData.priority);
            setDueDate(initialData.dueDate ? format(new Date(initialData.dueDate), 'yyyy-MM-dd') : '');
            setTags(initialData.tags ? initialData.tags.join(', ') : '');
            setCategory(initialData.category || '');
        } else {
            resetForm();
        }
    }, [initialData, isOpen]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setTags('');
        setCategory('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            priority,
            dueDate,
            category,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };
        onSubmit(taskData);
        if (!initialData) resetForm(); // Only reset if creating
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-6 overflow-y-auto border-l border-slate-100"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {initialData ? 'Edit Task' : 'New Task'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                                    placeholder="What needs to be done?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all min-h-[100px] placeholder:text-slate-300"
                                    placeholder="Add details..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Added Category Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category / Project</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none placeholder:text-slate-300"
                                    placeholder="e.g., Work, Personal, Marketing"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        <div className="flex items-center gap-2">
                                            <FiFlag className="w-4 h-4" /> Priority
                                        </div>
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="w-4 h-4" /> Due Date
                                        </div>
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    <div className="flex items-center gap-2">
                                        <FiTag className="w-4 h-4" /> Tags
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none placeholder:text-slate-300"
                                    placeholder="work, urgent, design (comma separated)"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 text-slate-700 font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 text-white font-medium bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02]"
                                >
                                    {initialData ? 'Save Changes' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TaskForm;
