import { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths
} from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CalendarView = ({ tasks, onEdit }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    const days = [];

    // Create header with days of week
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const header = weekDays.map(day => (
        <div className="text-center font-medium text-slate-500 py-2 border-b border-slate-100 uppercase text-xs tracking-wider" key={day}>
            {day}
        </div>
    ));

    const dayList = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                        <FiChevronLeft />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                        <FiChevronRight />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 bg-slate-200 gap-px">
                {/* Weekday Headers */}
                {weekDays.map(day => (
                    <div key={day} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500 uppercase">
                        {day}
                    </div>
                ))}

                {/* Days */}
                {dayList.map((day, i) => {
                    // Find tasks for this day
                    const dayTasks = tasks.filter(task =>
                        task.dueDate && isSameDay(new Date(task.dueDate), day)
                    );

                    return (
                        <div
                            key={i}
                            className={`min-h-[120px] bg-white p-2 flex flex-col gap-1 transition-colors hover:bg-slate-50 
                                ${!isSameMonth(day, monthStart) ? "text-slate-300 bg-slate-50/50" : "text-slate-800"}
                                ${isSameDay(day, new Date()) ? "bg-primary-50/30" : ""}
                            `}
                        >
                            <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1
                                ${isSameDay(day, new Date()) ? "bg-primary-600 text-white" : ""}
                            `}>
                                {format(day, dateFormat)}
                            </span>

                            <div className="flex flex-col gap-1 overflow-y-auto max-h-[90px] no-scrollbar">
                                {dayTasks.map(task => (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        key={task._id}
                                        onClick={() => onEdit(task)}
                                        className={`text-xs text-left px-2 py-1 rounded truncate border-l-2
                                            ${task.priority === 'high' ? 'bg-rose-50 text-rose-700 border-rose-500' :
                                                task.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-500' :
                                                    'bg-green-50 text-green-700 border-green-500'}
                                            ${task.status === 'completed' ? 'opacity-50 line-through' : ''}
                                        `}
                                    >
                                        {task.title}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
