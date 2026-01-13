import { PiArrowDownRight, PiArrowUpRight } from 'react-icons/pi';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    XAxis,
    YAxis
} from 'recharts';
import { CircularChartIcon, WorldMapAltIcon } from '../components/icons.svg';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '../components/ui/chart';
import { cn } from '../lib/utils';


const revenueConfig = {
    current: {
        label: "Current Week",
        color: "#1C1C1C", // Black
    },
    previous: {
        label: "Previous Week",
        color: "#A8C5DA", // Light Blue
    },
};

const projectionConfig = {
    val: {
        label: "Projections",
        color: "#A8C5DA",
    },
};

const salesConfig = {
    Direct: { label: "Direct", color: "var(--foreground)" },
    Affiliate: { label: "Affiliate", color: "#BAEDBD" },
    Sponsored: { label: "Sponsored", color: "#95A4FC" },
    "E-mail": { label: "E-mail", color: "#B1E3FF" },
};

// --- Mock Data ---

const revenueData = [
    { name: 'Jan', current: 12, previous: 8 },
    { name: 'Feb', current: 16, previous: 14 },
    { name: 'Mar', current: 17, previous: 12 },
    { name: 'Apr', current: 13, previous: 9 },
    { name: 'May', current: 18, previous: 11 },
    { name: 'Jun', current: 24, previous: 19 },
];

const projectionData = [
    { name: 'Jan', val: 18 }, { name: 'Feb', val: 24 }, { name: 'Mar', val: 21 },
    { name: 'Apr', val: 28 }, { name: 'May', val: 16 }, { name: 'Jun', val: 24 }
];

const salesDistribution = [
    { name: 'Direct', value: 300.56, fill: '#1C1C1C' },
    { name: 'Affiliate', value: 135.18, fill: '#BAEDBD' },
    { name: 'Sponsored', value: 154.02, fill: '#95A4FC' },
    { name: 'E-mail', value: 48.96, fill: '#B1E3FF' },
];

const locationData = [
    { city: 'New York', value: 72, label: '72K' },
    { city: 'San Francisco', value: 39, label: '39K' },
    { city: 'Sydney', value: 25, label: '25K' },
    { city: 'Singapore', value: 61, label: '61K' },
];

// --- Components ---

const StatCard = ({ title, value, change, isPositive, className }) => {
    return (
        <div className={cn(
            "p-6 rounded-2xl flex flex-col justify-between h-32 transition-colors",
            className
        )}>
            <span className="text-sm font-medium opacity-80">{title}</span>
            <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold">{value}</h2>
                <div className="flex items-center gap-1 text-xs font-medium">
                    <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
                        {change} {isPositive ? <PiArrowUpRight className="inline" /> : <PiArrowDownRight className="inline" />}
                    </span>
                </div>
            </div>
        </div>
    );
};



export default function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-lg font-bold">eCommerce</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard title="Customers" value="3,781" change="+11.01%" isPositive={true} className="bg-primary-blue dark:text-black" />

                    <StatCard title="Orders" value="1,219" change="-0.03%" isPositive={false} className="bg-primary-light dark:bg-primary-light dark:text-white" />

                    <StatCard title="Revenue" value="$695" change="+15.03%" isPositive={true} className="bg-primary-light dark:bg-primary-light dark:text-white" />

                    <StatCard title="Growth" value="30.1%" change="+6.08%" isPositive={true} className="bg-primary-purple dark:text-black" />
                </div>

                <div className="bg-card p-6 rounded-2xl flex flex-col justify-between border border-border/50">
                    <h3 className="font-semibold text-sm mb-6">Projections vs Actuals</h3>
                    <div className="h-48 w-full mt-auto">
                        <ChartContainer config={projectionConfig} className="h-full w-full">
                            <BarChart data={projectionData} barSize={28}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="val" fill="var(--color-val)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </div>

            {/* --- Middle Row --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-sm">Revenue</h3>
                            <div className="h-4 w-px bg-border/50 mx-2"></div>
                            <div className="flex items-center gap-2 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
                                <span className="text-xs font-medium text-muted-foreground">Current Week <span className="font-bold ml-1 text-foreground">$58,211</span></span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                                <span className="text-xs text-muted-foreground">Previous Week <span className="ml-1 text-foreground">$68,768</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="h-72 w-full">
                        <ChartContainer config={revenueConfig} className="h-full w-full">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="previous"
                                    stroke="var(--color-previous)"
                                    strokeWidth={3}
                                    fill="none"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="current"
                                    stroke="var(--color-current)"
                                    strokeWidth={3}
                                    fill="url(#colorCurrent)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col">
                    <h3 className="font-semibold text-sm mb-4">Revenue by Location</h3>
                    <div className="h-32 w-full mb-6">
                        <WorldMapAltIcon size={280} />
                    </div>
                    <div className="space-y-4 mt-auto">
                        {locationData.map((loc) => (
                            <div key={loc.city} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">{loc.city}</span>
                                    <span className="font-medium">{loc.label}</span>
                                </div>
                                <div className="h-1 w-full bg-border/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-300 rounded-full"
                                        style={{ width: `${(loc.value / 100) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Bottom Row --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-card p-6 rounded-2xl border border-border/50">
                    <h3 className="font-semibold text-sm mb-6">Top Selling Products</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[500px]">
                            <thead>
                                <tr className="text-xs text-muted-foreground border-b border-border/50">
                                    <th className="pb-3 font-normal">Name</th>
                                    <th className="pb-3 font-normal">Price</th>
                                    <th className="pb-3 font-normal">Quantity</th>
                                    <th className="pb-3 font-normal text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                <tr className="group">
                                    <td className="py-4 font-medium">ASOS Ridley High Waist</td>
                                    <td className="py-4 text-muted-foreground">$79.49</td>
                                    <td className="py-4 text-muted-foreground">82</td>
                                    <td className="py-4 text-right font-medium">$6,518.18</td>
                                </tr>
                                <tr className="group">
                                    <td className="py-4 font-medium">Marco Lightweight Shirt</td>
                                    <td className="py-4 text-muted-foreground">$128.50</td>
                                    <td className="py-4 text-muted-foreground">37</td>
                                    <td className="py-4 text-right font-medium">$4,754.50</td>
                                </tr>
                                <tr className="group">
                                    <td className="py-4 font-medium">Half Sleeve Shirt</td>
                                    <td className="py-4 text-muted-foreground">$39.99</td>
                                    <td className="py-4 text-muted-foreground">64</td>
                                    <td className="py-4 text-right font-medium">$2,559.36</td>
                                </tr>
                                <tr className="group">
                                    <td className="py-4 font-medium">Lightweight Jacket</td>
                                    <td className="py-4 text-muted-foreground">$20.00</td>
                                    <td className="py-4 text-muted-foreground">184</td>
                                    <td className="py-4 text-right font-medium">$3,680.00</td>
                                </tr>
                                <tr className="group">
                                    <td className="py-4 font-medium">Marco Shoes</td>
                                    <td className="py-4 text-muted-foreground">$79.49</td>
                                    <td className="py-4 text-muted-foreground">64</td>
                                    <td className="py-4 text-right font-medium">$1,965.81</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-card p-6 rounded-2xl flex flex-col border border-border/50">
                    <h3 className="font-semibold text-sm mb-2">Total Sales</h3>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="h-48 w-full relative">
                            <CircularChartIcon className="mx-auto aspect-square max-h-[250px]" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-sm font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">38.6%</span>
                            </div>
                        </div>

                        <div className="w-full mt-4 space-y-2">
                            {salesDistribution.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                                        <span className="text-muted-foreground">{item.name}</span>
                                    </div>
                                    <span className="font-medium">${item.value.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}