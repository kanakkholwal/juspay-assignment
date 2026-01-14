import { useEffect } from "react";
import { PiArrowDownRight, PiArrowUpRight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts";
import { CircularChartIcon, WorldMapAltIcon } from "../components/icons.svg";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../components/ui/chart";
import { cn } from "../lib/utils";
import { getDashboardData } from "../store/dashboardSlice";


const revenueConfig = {
	current: { label: "Current Week", color: "#1C1C1C" },
	previous: { label: "Previous Week", color: "#A8C5DA" },
};
const projectionConfig = {
	val: { label: "Projections", color: "#A8C5DA" },
};





export default function Dashboard() {
	const dispatch = useDispatch();
	const { data, status } = useSelector((state) => state.dashboard);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getDashboardData());
		}
	}, [status, dispatch]);

	if (status === 'loading' || status === 'idle') {
		return <DashboardSkeleton />;
	}

	if (status === 'failed') {
		return <div className="p-10 text-center text-red-500">Failed to load dashboard data.</div>;
	}

	const {
		stats,
		projectionData,
		revenueData,
		locationData,
		topSelling,
		salesDistribution
	} = data;

	return (
		<div className="space-y-6 @container">
			<h1 className="text-lg font-bold">eCommerce</h1>

			<div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{stats.map((stat) => (
						<StatCard
							key={stat.title}
							title={stat.title}
							value={stat.value}
							change={stat.change}
							isPositive={stat.isPositive}
							className={cn(
								stat.type === 'customers' && "bg-primary-blue dark:text-black",
								(stat.type === 'orders' || stat.type === 'revenue') && "bg-primary-light dark:bg-primary-light dark:text-white",
								stat.type === 'growth' && "bg-primary-purple dark:text-black"
							)}
						/>
					))}
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
									tick={{ fontSize: 12, fill: "#94a3b8" }}
									dy={10}
								/>
								<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
								<Bar dataKey="val" fill="var(--color-val)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ChartContainer>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 @3xl:grid-cols-10 gap-6">
				<div className="@3xl:col-span-7 bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
						<div className="flex items-center gap-4">
							<h3 className="font-semibold text-sm">Revenue</h3>
							<div className="h-4 w-px bg-border/50 mx-2"></div>
							<div className="flex items-center gap-2 font-medium">
								<div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
								<span className="text-xs font-medium text-muted-foreground">
									Current Week <span className="font-bold ml-1 text-foreground">$58,211</span>
								</span>
							</div>
							<div className="flex items-center gap-2 font-medium">
								<div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
								<span className="text-xs text-muted-foreground">
									Previous Week <span className="ml-1 text-foreground">$68,768</span>
								</span>
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
								<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={10} />
								<YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Area type="monotone" dataKey="previous" stroke="var(--color-previous)" strokeWidth={3} fill="none" />
								<Area type="monotone" dataKey="current" stroke="var(--color-current)" strokeWidth={3} fill="url(#colorCurrent)" />
							</AreaChart>
						</ChartContainer>
					</div>
				</div>

				<div className="@3xl:col-span-3 bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col">
					<h3 className="font-semibold text-sm mb-4">Revenue by Location</h3>
					<div className="h-32 w-full mb-6 text-foreground/20">
						<WorldMapAltIcon size={280} className="w-full h-full" />
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

			<div className="grid grid-cols-1 @3xl:grid-cols-10 gap-6">
				<div className="@3xl:col-span-7 bg-card p-6 rounded-2xl border border-border/50">
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
								{topSelling.map((product, i) => (
									<tr key={i} className="group">
										<td className="py-4 font-medium">{product.name}</td>
										<td className="py-4 text-muted-foreground">{product.price}</td>
										<td className="py-4 text-muted-foreground">{product.quantity}</td>
										<td className="py-4 text-right font-medium">{product.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="@3xl:col-span-3 bg-card p-6 rounded-2xl flex flex-col border border-border/50">
					<h3 className="font-semibold text-sm mb-2">Total Sales</h3>
					<div className="flex-1 flex flex-col items-center justify-center">
						<div className="w-full relative">
							<CircularChartIcon className="mx-auto aspect-square size-40 text-foreground" />
							<div className="absolute inset-0 right-1/2 top-1/2 flex items-center justify-center pointer-events-none">
								<span className="text-sm font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">
									38.6%
								</span>
							</div>
						</div>

						<div className="w-full mt-4 space-y-2">
							{salesDistribution.map((item) => (
								<div key={item.name} className="flex items-center justify-between text-xs">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
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

const StatCard = ({ title, value, change, isPositive, className }) => (
	<div className={cn("p-6 rounded-2xl flex flex-col justify-between h-32 transition-colors", className)}>
		<span className="text-sm font-medium opacity-80">{title}</span>
		<div className="flex items-end justify-between">
			<h2 className="text-3xl font-bold">{value}</h2>
			<div className="flex items-center gap-1 text-xs font-medium">
				<span className={isPositive ? "text-emerald-500" : "text-red-500"}>
					{change}
					{isPositive ? <PiArrowUpRight className="inline" /> : <PiArrowDownRight className="inline" />}
				</span>
			</div>
		</div>
	</div>
);

// Loading Skeleton
const DashboardSkeleton = () => (
	<div className="space-y-6 animate-pulse">
		<div className="h-8 w-48 bg-secondary/50 rounded mb-6"></div>

		<div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-32 rounded-2xl bg-secondary/50"></div>
				))}
			</div>
			<div className="h-[300px] @xl:h-auto rounded-2xl bg-secondary/50"></div>
		</div>

		<div className="grid grid-cols-1 @3xl:grid-cols-10 gap-6">
			<div className="@3xl:col-span-7 h-96 rounded-2xl bg-secondary/50"></div>
			<div className="@3xl:col-span-3 h-96 rounded-2xl bg-secondary/50"></div>
		</div>

		<div className="grid grid-cols-1 @3xl:grid-cols-10 gap-6">
			<div className="@3xl:col-span-7 h-80 rounded-2xl bg-secondary/50"></div>
			<div className="@3xl:col-span-3 h-80 rounded-2xl bg-secondary/50"></div>
		</div>
	</div>
);