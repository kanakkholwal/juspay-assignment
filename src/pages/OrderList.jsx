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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../components/icons";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { cn } from "../lib/utils";
// Actions
import {
    addNewOrder,
    fetchOrders,
    setColumnFilters,
    setGlobalFilter,
    setPagination,
    setSorting
} from "../store/ordersSlice";

const columnHelper = createColumnHelper();
const STATUS_OPTIONS = ["In Progress", "Complete", "Pending", "Approved", "Rejected"];

export default function OrderList() {
    const dispatch = useDispatch();

    // Redux State
    const {
        data,
        status,
        addingStatus,
        globalFilter,
        sorting,
        columnFilters,
        pagination
    } = useSelector((state) => state.orders);

    const isLoading = status === 'loading' || status === 'idle';
    const isAdding = addingStatus === 'loading';
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchOrders());
        }
    }, [status, dispatch]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "select",
            enableGlobalFilter: false,
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            ),
        }),

        columnHelper.accessor("id", {
            header: "Order ID",
            cell: (info) => <span className="text-muted-foreground font-mono text-xs">{info.getValue()}</span>,
        }),

        columnHelper.accessor("user.name", {
            id: "user",
            header: "User",
            cell: (info) => (
                <div className="flex items-center gap-3 whitespace-nowrap group cursor-pointer">
                    <img
                        src={info.row.original.user.avatar}
                        className="size-8 rounded-full bg-secondary object-cover border border-border"
                        alt="avatar"
                    />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {info.getValue()}
                    </span>
                </div>
            ),
        }),

        columnHelper.accessor("project", {
            header: "Project",
            cell: (info) => <span className="text-muted-foreground whitespace-nowrap">{info.getValue()}</span>,
        }),

        columnHelper.accessor("address", {
            header: "Address",
            cell: (info) => (
                <span className="text-muted-foreground whitespace-nowrap inline-flex items-center gap-2 cursor-pointer">
                    {info.getValue()}
                    <Icon name="clipboard" className="size-3.5 opacity-0 group-hover:opacity-100" />
                </span>
            ),
        }),

        columnHelper.accessor("date", {
            header: "Date",
            cell: (info) => (
                <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground text-xs">
                    <Icon name="calendar" className="size-3.5" />
                    {info.getValue()}
                </div>
            ),
        }),

        columnHelper.accessor("status", {
            header: "Status",
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
            cell: (info) => {
                const status = info.getValue();
                let color = "bg-gray-400";
                let textColor = "text-muted-foreground";
                if (status === "In Progress") { color = "bg-blue-500"; textColor = "text-blue-600 dark:text-blue-400"; }
                if (status === "Complete") { color = "bg-emerald-500"; textColor = "text-emerald-600 dark:text-emerald-400"; }
                if (status === "Pending") { color = "bg-blue-300"; textColor = "text-blue-400"; }
                if (status === "Approved") { color = "bg-amber-400"; textColor = "text-amber-500"; }
                return (
                    <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
                        <span className={cn('w-2 h-2 rounded-full shadow-sm', color)} />
                        <span className={textColor}>{status}</span>
                    </div>
                );
            },
        }),

        columnHelper.display({
            id: "actions",
            enableGlobalFilter: false,
            cell: () => (
                <button className="opacity-0 group-hover:opacity-100 inline-flex p-1.5 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                    <Icon name="dots-three" />
                </button>
            ),
        }),
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, sorting, columnFilters, pagination },
        onGlobalFilterChange: (value) => dispatch(setGlobalFilter(value)),
        onSortingChange: (updater) => {
            const value = typeof updater === 'function' ? updater(sorting) : updater;
            dispatch(setSorting(value));
        },
        onColumnFiltersChange: (updater) => {
            const value = typeof updater === 'function' ? updater(columnFilters) : updater;
            dispatch(setColumnFilters(value));
        },
        onPaginationChange: (updater) => {
            const value = typeof updater === 'function' ? updater(pagination) : updater;
            dispatch(setPagination(value));
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableGlobalFilter: true,
    });

    const handleAddOrder = async () => {
        const newOrder = {
            user: { name: "New User", avatar: `https://i.pravatar.cc/150?u=${Math.random()}` },
            project: "New Application",
            address: "New Street, City",
            date: "Just now",
            status: "Pending",
        };
        await dispatch(addNewOrder(newOrder)).unwrap();
        toast.success("Order added successfully");
    };

    const handleStatusFilterChange = (status) => {
        const currentFilter = columnFilters.find((f) => f.id === "status")?.value || [];
        const newFilter = currentFilter.includes(status)
            ? currentFilter.filter((s) => s !== status)
            : [...currentFilter, status];

        const newColumnFilters = newFilter.length > 0
            ? [{ id: "status", value: newFilter }, ...columnFilters.filter((f) => f.id !== "status")]
            : columnFilters.filter((f) => f.id !== "status");

        dispatch(setColumnFilters(newColumnFilters));
    };

    const activeStatusFilters = columnFilters.find(f => f.id === "status")?.value || [];

    return (
        <div className="space-y-4 h-full flex flex-col">
            <h2 className="text-xl font-bold tracking-tight">Order List</h2>

            <div className="flex flex-wrap justify-between items-start sm:items-center gap-4 bg-card p-2 rounded-lg border border-border/40 @container/toolbar">
                <div className="flex items-center gap-2 relative">
                    <Button
                        variant="ghost"
                        size="icon_sm"
                        onClick={handleAddOrder}
                        disabled={isAdding}
                        title="Add New Order"
                    >
                        {isAdding ? (
                            <Icon name="spinner" className="animate-spin text-muted-foreground" />
                        ) : (
                            <Icon name="plus" />
                        )}
                    </Button>

                    <div className="relative">
                        <Button
                            variant={activeStatusFilters.length > 0 ? "secondary" : "ghost"}
                            size="icon_sm"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            title="Filter by Status"
                        >
                            <Icon name="funnel" />
                        </Button>
                        <AnimatePresence>
                            {isFilterOpen && (
                                <>
                                    <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl z-40 p-1.5 flex flex-col gap-1"
                                    >
                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                            Filter Status
                                        </div>
                                        {STATUS_OPTIONS.map((status) => (
                                            <div
                                                key={status}
                                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary/50 rounded-md cursor-pointer text-sm transition-colors"
                                                onClick={() => handleStatusFilterChange(status)}
                                            >
                                                <Checkbox
                                                    checked={activeStatusFilters.includes(status)}
                                                    onCheckedChange={() => handleStatusFilterChange(status)}
                                                    className="size-4"
                                                />
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                        {activeStatusFilters.length > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-1 h-7 text-xs text-muted-foreground hover:text-foreground"
                                                onClick={() => dispatch(setColumnFilters(columnFilters.filter(f => f.id !== "status")))}
                                            >
                                                Clear Filters
                                            </Button>
                                        )}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button
                        variant={sorting.length > 0 ? "secondary" : "ghost"}
                        size="icon_sm"
                        onClick={() => dispatch(setSorting([]))}
                        title="Clear Sort"
                    >
                        <Icon name="arrows-down-up" />
                    </Button>
                </div>

                <div className="relative flex items-center w-full @sm/toolbar:w-auto">
                    <Icon name="search" className="absolute my-auto left-3 size-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                    <input
                        type="search"
                        value={globalFilter ?? ""}
                        onChange={(e) => dispatch(setGlobalFilter(e.target.value))}
                        placeholder="Search user, project, address..."
                        className="bg-background border border-border rounded-lg px-3 py-2 pl-9 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 shadow-sm"
                    />
                    {isLoading && <Icon name="spinner" className="absolute right-3 animate-spin text-primary" />}
                </div>
            </div>

            <div className="relative overflow-hidden min-h-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground text-xs uppercase font-semibold border-b border-border/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={cn(
                                                "px-4 py-3 select-none transition-colors group/header",
                                                header.column.getCanSort() && "cursor-pointer hover:text-foreground"
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                                        >
                                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <span className="text-muted-foreground/50 group-hover/header:text-primary transition-colors">
                                                        {{
                                                            asc: <Icon name="arrows-down-up" className="size-3 rotate-180 text-primary" />,
                                                            desc: <Icon name="arrows-down-up" className="size-3 text-primary" />,
                                                        }[header.column.getIsSorted()] ?? <Icon name="arrows-down-up" className="size-3 opacity-0 group-hover/header:opacity-50" />}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan={columns.length} className="p-0">
                                            <TableSkeleton />
                                        </td>
                                    </motion.tr>
                                ) : table.getRowModel().rows.length > 0 ? (
                                    table.getRowModel().rows.map((row, i) => (
                                        <motion.tr
                                            key={row.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.15, delay: i * 0.03 }}
                                            className="group hover:bg-primary-light transition-colors"
                                        >
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
                                        <td colSpan={columns.length} className="h-64 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Icon name="search" className="size-8 opacity-20" />
                                                <p>No results found</p>
                                                {(globalFilter || activeStatusFilters.length > 0) && (
                                                    <Button
                                                        variant="link"
                                                        onClick={() => {
                                                            dispatch(setGlobalFilter(""));
                                                            dispatch(setColumnFilters([]));
                                                        }}
                                                        className="text-primary h-auto p-0"
                                                    >
                                                        Clear filters & search
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-end px-2 pt-2">

                <div className="flex items-center gap-2">
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
                            const pageNum = i + 1;
                            const isCurrent = table.getState().pagination.pageIndex === i;
                            return (
                                <Button
                                    key={pageNum}
                                    variant="ghost"
                                    size="icon_sm"
                                    onClick={() => table.setPageIndex(i)}
                                    className={cn(isCurrent ? "bg-secondary" : "")}

                                >
                                    {pageNum}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon_sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <Icon name="caret-right" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

const TableSkeleton = () => (
    <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b border-border/40 last:border-0">
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