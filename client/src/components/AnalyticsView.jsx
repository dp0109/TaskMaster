import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const AnalyticsView = ({ tasks }) => {

    const statusData = useMemo(() => {
        const pending = tasks.filter(t => t.status === 'pending').length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        return [
            { name: 'Pending', value: pending },
            { name: 'Completed', value: completed }
        ];
    }, [tasks]);

    const priorityData = useMemo(() => {
        const high = tasks.filter(t => t.priority === 'high').length;
        const medium = tasks.filter(t => t.priority === 'medium').length;
        const low = tasks.filter(t => t.priority === 'low').length;
        return [
            { name: 'High', count: high },
            { name: 'Medium', count: medium },
            { name: 'Low', count: low }
        ];
    }, [tasks]);

    const COLORS = ['#FCD34D', '#10B981']; // Warning (Pending), Green (Completed)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completion Status */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Task Completion</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell key="cell-pending" fill="#fda4af" /> {/* Light Red/Pink for Pending? Or Amber? */}
                                <Cell key="cell-completed" fill="#34d399" />
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Task Priority Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Tasks by Priority</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={priorityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">Total Tasks</p>
                        <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-green-600 text-sm">Completed</p>
                        <p className="text-2xl font-bold text-green-700">{statusData[1].value}</p>
                    </div>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="text-rose-600 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-rose-700">{statusData[0].value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
