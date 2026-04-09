import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

const StatCard = ({ label, value, icon: Icon, color, bg }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${bg}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
            </div>
        </div>
    );
};

export default StatCard;