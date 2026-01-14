import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { fetchOrders } from "../api/orders";
import { Icon } from "../components/icons";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { cn } from "../lib/utils";



const columnHelper = createColumnHelper();

export default function OrderList() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);


	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			const result = await fetchOrders();
			setData(result);
			setIsLoading(false);
		};
		loadData();
	}, []);

	// to prevent rerenders
	const columns = useMemo(() => [
		columnHelper.accessor("id", {
			header: "Order ID",
			cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
		}),
		columnHelper.accessor("user", {
			header: "User",
			cell: (info) => (
				<div className="flex items-center gap-2 whitespace-nowrap">
					<img src={info.getValue().avatar} className="w-6 h-6 rounded-full bg-secondary" alt="avatar" />
					<span className="font-medium">{info.getValue().name}</span>
				</div>
			),
		}),
		columnHelper.accessor("project", {
			header: "Project",
			cell: (info) => <span className="text-muted-foreground whitespace-nowrap">{info.getValue()}</span>,
		}),
		columnHelper.accessor("address", {
			header: "Address",
			cell: (info) => <span className="text-muted-foreground whitespace-nowrap inline-flex items-center gap-2">
				{info.getValue()}
				<Icon name="clipboard" className="size-4 opacity-0 group-hover:opacity-100 cursor-pointer" />
			</span>,
		}),
		columnHelper.accessor("date", {
			header: "Date",
			cell: (info) => (
				<div className="flex items-center gap-1 whitespace-nowrap text-muted-foreground">
					<Icon name="calendar" className="size-4" />
					{info.getValue()}
				</div>
			),
		}),
		columnHelper.accessor("status", {
			header: "Status",
			cell: (info) => {
				const status = info.getValue();
				let color = "bg-gray-400";
				let textColor = "text-muted-foreground";

				if (status === "In Progress") { color = "bg-blue-500"; textColor = "text-blue-500"; }
				if (status === "Complete") { color = "bg-emerald-500"; textColor = "text-emerald-500"; }
				if (status === "Pending") { color = "bg-blue-300"; textColor = "text-blue-400"; }
				if (status === "Approved") { color = "bg-amber-400"; textColor = "text-amber-500"; }

				return (
					<div className="flex items-center gap-2 text-xs whitespace-nowrap">
						<span className={cn('w-1.5 h-1.5 rounded-full', color)} />
						<span className={textColor}>{status}</span>
					</div>
				);
			},
		}),
		columnHelper.display({
			id: "actions",
			cell: () => (
				<button className="opacity-0 group-hover:opacity-100 inline-flex p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
					<Icon name="dots-three" />
				</button>
			),
		}),
	], []);

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			sorting,
		},
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 8,
			},
		},
	});

	return (
		<div className="space-y-4 h-full flex flex-col">
			<h2 className="text-lg font-semibold mb-4">Order List</h2>

			<div className="flex flex-wrap justify-between items-start sm:items-center gap-4 bg-card p-2 rounded-lg border border-border/40 @container/toolbar">
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon_sm">
						<Icon name="plus" />
					</Button>
					<Button variant="ghost" size="icon_sm">
						<Icon name="funnel" />
					</Button>
					<Button
						variant={sorting.length > 0 ? "default_soft" : "ghost"}
						size="icon_sm"
						onClick={() => setSorting([])}
						title="Clear Sort"
					>
						<Icon name="arrows-down-up" />
					</Button>
				</div>
				<div className="relative flex items-center w-full @sm/toolbar:w-auto">
					<Icon name="search" className="absolute my-auto left-2.5 size-4 text-muted-foreground pointer-events-none" />
					<input
						type="search"
						value={globalFilter ?? ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
						placeholder="Search orders..."
						className="bg-background border border-border rounded-md px-3 py-1.5 pl-9 text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-muted-foreground/50"
					/>
					{isLoading && <Icon name="spinner" className="absolute right-3 animate-spin text-muted-foreground" />}
				</div>
			</div>


			<div className="relative rounded-x overflow-hidden min-h-100">

				{isLoading ? (
					<TableSkeleton />
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="text-muted-foreground text-xs uppercase font-medium border-b border-border/50">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										<th className="px-4 py-3 w-8">
											<Checkbox />
										</th>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												className="px-4 py-3 font-medium cursor-pointer select-none hover:text-foreground transition-colors group"
												onClick={header.column.getToggleSortingHandler()}
											>
												<div className="flex items-center gap-1">
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: <Icon name="arrows-down-up" className="size-3 rotate-180" />,
														desc: <Icon name="arrows-down-up" className="size-3" />,
													}[header.column.getIsSorted()] ?? null}
												</div>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody className="divide-y divide-border/30">

								<AnimatePresence>

									{table.getRowModel().rows.length > 0 ? (
										table.getRowModel().rows.map((row, i) => (
											<motion.tr
												key={row.id}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.2, delay: i * 0.05 }}
												className="group hover:bg-primary-light transition-colors"
											>
												<td className="px-4 py-3">
													<Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
												</td>
												{row.getVisibleCells().map((cell) => (
													<td key={cell.id} className="px-4 py-3">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</td>
												))}
											</motion.tr>
										))
									) : (
										<motion.tr
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											<td colSpan={columns.length + 1} className="h-64 text-center text-muted-foreground">
												<div className="flex flex-col items-center justify-center gap-2">
													<Icon name="search" className="size-8 opacity-20" />
													<p>No results found for "{globalFilter}"</p>
													<Button variant="link" onClick={() => setGlobalFilter("")} className="text-primary h-auto p-0">
														Clear search
													</Button>
												</div>
											</td>
										</motion.tr>
									)}
								</AnimatePresence>

							</tbody>
						</table>
					</div>
				)}
			</div>

			<div className="flex items-center justify-end px-2">

				<div className="flex gap-2">
					<Button
						variant="ghost"
						size="icon_sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<Icon name="caret-left" />
					</Button>
					<div className="flex items-center gap-1">
						{Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
							return (
								<Button
									key={i + 1}
									onClick={() => table.setPageIndex(i)}
									variant="ghost"
									size="icon_sm"
									className={cn(
										table.getState().pagination.pageIndex === i
											? "bg-secondary text-foreground font-medium"
											: "text-muted-foreground hover:bg-secondary/50"
									)}
								>
									{i + 1}
								</Button>
							)
						})}
					</div>
					<Button
						variant="ghost"
						size="icon_sm" onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<Icon name="caret-right" className="size-4" />
					</Button>
				</div>
			</div>
		</div >
	);
}



const TableSkeleton = () => (
	<div className="animate-pulse space-y-4">
		{[...Array(5)].map((_, i) => (
			<div key={i} className="flex items-center space-x-4 p-4 border-b border-border/40">
				<div className="h-4 w-4 bg-secondary rounded"></div>
				<div className="h-4 w-20 bg-secondary rounded"></div>
				<div className="h-8 w-8 bg-secondary rounded-full"></div>
				<div className="h-4 w-32 bg-secondary rounded"></div>
				<div className="h-4 w-24 bg-secondary rounded"></div>
				<div className="h-4 w-24 bg-secondary rounded"></div>
				<div className="h-4 w-16 bg-secondary rounded"></div>
			</div>
		))}
	</div>
);
