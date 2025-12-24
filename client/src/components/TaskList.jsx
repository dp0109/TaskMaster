import { useRef } from 'react';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete, isLoading }) => {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-slate-800">No tasks found</h3>
                <p className="text-slate-500 mt-1">Get started by creating a new task!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task, index) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
