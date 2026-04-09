import { OverviewChart } from "../components/ui/AreaChart";
import { ResourceChart } from "../components/ui/BarChart";
import StatCard from "../components/ui/StatCard";
import statistics from "../../mock/statistics";

export default function HomePage() {
    const pageData = {
        title: "Dashboard",
        description: "Everything is protected by Middleware."
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{pageData.title}</h1>
                <p className="text-gray-500">{pageData.description}</p>
            </header>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statistics.map((stat) => (
                        <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} bg={stat.bg} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <OverviewChart />
                    </div>
                    <div>
                        <ResourceChart />
                    </div>
                </div>
            </div>
        </div>
    );
}