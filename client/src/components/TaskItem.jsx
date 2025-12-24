import { motion } from 'framer-motion';
import { FiClock, FiEdit2, FiTrash2, FiFlag, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import clsx from 'clsx';

const priorityColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-amber-600 bg-amber-50 border-amber-200',
    high: 'text-rose-600 bg-rose-50 border-rose-200',
};

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
    const isCompleted = task.status === 'completed';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={clsx(
                "group relative bg-white rounded-xl border p-5 transition-all hover:shadow-md",
                isCompleted ? "border-slate-100 bg-slate-50/50" : "border-slate-200"
            )}
        >
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggleStatus(task)}
                    className={clsx(
                        "mt-1 flex-shrink-0 transition-colors duration-200",
                        isCompleted ? "text-primary-500" : "text-slate-300 hover:text-primary-500"
                    )}
                >
                    {isCompleted ? <FiCheckCircle className="w-6 h-6" /> : <FiCircle className="w-6 h-6" />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className={clsx(
                            "font-semibold text-lg truncate pr-8 transition-colors",
                            isCompleted ? "text-slate-400 line-through decoration-slate-300" : "text-slate-800"
                        )}>
                            {task.title}
                        </h3>
                    </div>

                    {task.description && (
                        <p className={clsx(
                            "mt-1 text-sm line-clamp-2",
                            isCompleted ? "text-slate-400" : "text-slate-600"
                        )}>
                            {task.description}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className={clsx(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border",
                            priorityColors[task.priority]
                        )}>
                            <FiFlag className="w-3 h-3" />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>

                        {task.dueDate && (
                            <span className={clsx(
                                "inline-flex items-center gap-1.5 text-xs",
                                isCompleted ? "text-slate-400" : "text-slate-500"
                            )}>
                                <FiClock className="w-3.5 h-3.5" />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                        )}

                        {task.tags && task.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions (visible on hover or focused) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(task)}
                    className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                    <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                    <FiTrash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskItem;
