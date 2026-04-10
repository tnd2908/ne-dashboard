"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", total: 400 },
    { name: "Feb", total: 700 },
    { name: "Mar", total: 500 },
    { name: "Apr", total: 900 },
    { name: "May", total: 1200 },
    { name: "Jun", total: 1100 },
    { name: "Jul", total: 1300 },
    { name: "Aug", total: 1400 },
    { name: "Sep", total: 500 },
    { name: "Oct", total: 600 },
    { name: "Nov", total: 300 },
    { name: "Dec", total: 800 },
];

export const OverviewChart = () => {
    return (
        <div className="h-[300px] w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">
                Growth Overview
            </h3>
            <ResponsiveContainer width={'100%'} height={300} className="w-full h-full">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b2f63" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#3b2f63" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#3b2f63"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};