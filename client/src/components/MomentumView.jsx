import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FiCheck, FiClock, FiStar, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';

const MomentumView = ({ tasks, onUpdate }) => {
    // Filter only pending tasks for Momentum mode
    const [activeTasks, setActiveTasks] = useState(tasks.filter(t => t.status === 'pending'));

    // If no tasks, show empty state
    if (activeTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
                <div className="bg-green-100 p-6 rounded-full mb-6">
                    <FiStar className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">All Caught Up!</h3>
                <p className="text-slate-500 max-w-md">
                    You've cleared your focus queue. Great momentum! Check back later or add new tasks.
                </p>
            </div>
        );
    }

    const removeTask = (id) => {
        setActiveTasks(prev => prev.filter(t => t._id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center h-[70vh] relative overflow-hidden">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Momentum Mode</h2>
                <p className="text-slate-500">Swipe Right to Focus, Left to Snooze, Up to Complete</p>
            </div>

            <div className="relative w-full max-w-sm h-96">
                <AnimatePresence>
                    {activeTasks.map((task, index) => {
                        // Only render the top 2 cards for performance
                        if (index > 1) return null;

                        return (
                            <SwipeCard
                                key={task._id}
                                task={task}
                                index={index}
                                onRemove={removeTask}
                                onUpdate={onUpdate}
                                isTop={index === 0}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

const SwipeCard = ({ task, index, onRemove, onUpdate, isTop }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Rotation based on X dragging
    const rotate = useTransform(x, [-200, 200], [-25, 25]);

    // Opacity indicators
    const focusOpacity = useTransform(x, [50, 150], [0, 1]); // Right (Green)
    const snoozeOpacity = useTransform(x, [-150, -50], [1, 0]); // Left (Orange)
    const completeOpacity = useTransform(y, [-150, -50], [1, 0]); // Up (Blue)

    const handleDragEnd = async (event, info) => {
        const threshold = 100;

        if (info.offset.x > threshold) {
            // Swipe Right: Focus Today (High Priority + Date=Today)
            onRemove(task._id);
            await onUpdate(task._id, { priority: 'high', dueDate: new Date() });
        } else if (info.offset.x < -threshold) {
            // Swipe Left: Snooze (Date=Tomorrow)
            onRemove(task._id);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            await onUpdate(task._id, { dueDate: tomorrow });
        } else if (info.offset.y < -threshold) {
            // Swipe Up: Complete
            onRemove(task._id);
            await onUpdate(task._id, { status: 'completed' });
        }
    };

    return (
        <motion.div
            style={{
                x: isTop ? x : 0,
                y: isTop ? y : 0,
                rotate: isTop ? rotate : 0,
                zIndex: 100 - index,
                scale: isTop ? 1 : 0.95,
                top: isTop ? 0 : 20,
            }}
            drag={isTop ? true : false} // Enable drag for both axes
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isTop ? 1 : 0.95, opacity: 1 }}
            exit={{ x: 0, y: -200, opacity: 0, transition: { duration: 0.2 } }}
            className={`absolute w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col justify-between h-96 cursor-grab active:cursor-grabbing origin-bottom`}
        >
            {/* Card Content */}
            <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                    ${task.priority === 'high' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}
                 `}>
                    {task.priority || 'Normal'}
                </span>
                {task.dueDate && (
                    <span className="text-xs text-slate-400 font-medium">
                        {format(new Date(task.dueDate), 'MMM d')}
                    </span>
                )}
            </div>

            <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
                    {task.title}
                </h3>
                <p className="text-slate-500 line-clamp-4">
                    {task.description || "No specific details provided. Just do it!"}
                </p>
                {task.category && (
                    <div className="mt-4">
                        <span className="text-sm font-medium text-primary-600">#{task.category}</span>
                    </div>
                )}
            </div>

            <div className="text-center text-xs text-slate-300 font-medium uppercase tracking-widest mt-auto">
                Momentum Card
            </div>

            {/* Swipe Indicators (Overlays) */}
            {isTop && (
                <>
                    <motion.div style={{ opacity: focusOpacity }} className="absolute top-8 left-8 border-4 border-green-500 text-green-500 rounded-lg px-4 py-2 text-2xl font-bold rotate-[-15deg] pointer-events-none">
                        FOCUS
                    </motion.div>
                    <motion.div style={{ opacity: snoozeOpacity }} className="absolute top-8 right-8 border-4 border-amber-500 text-amber-500 rounded-lg px-4 py-2 text-2xl font-bold rotate-[15deg] pointer-events-none">
                        SNOOZE
                    </motion.div>
                    <motion.div style={{ opacity: completeOpacity }} className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
                        <div className="inline-block border-4 border-blue-500 text-blue-500 rounded-lg px-4 py-2 text-2xl font-bold">
                            DONE
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default MomentumView;
