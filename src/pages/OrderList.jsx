import {
    createColumnHelper, flexRender, getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';
import { PiArrowsDownUp, PiDotsThreeOutline, PiFunnel, PiPlus } from 'react-icons/pi';
import { Button } from "../components/ui/button";
// Mock Data
const ORDERS_DATA = [
    { id: '#CM9801', user: { name: 'Natali Craig', avatar: 'https://i.pravatar.cc/150?u=1' }, project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
    { id: '#CM9802', user: { name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/150?u=2' }, project: 'CRM Admin pages', address: 'Larry San Francisco', date: 'A minute ago', status: 'Complete' },
    { id: '#CM9803', user: { name: 'Drew Cano', avatar: 'https://i.pravatar.cc/150?u=3' }, project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
    { id: '#CM9804', user: { name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/150?u=4' }, project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' },
    { id: '#CM9805', user: { name: 'Andi Lane', avatar: 'https://i.pravatar.cc/150?u=5' }, project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' },
];

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('id', { header: 'Order ID', cell: info => <span className="text-muted-foreground">{info.getValue()}</span> }),
    columnHelper.accessor('user', {
        header: 'User',
        cell: info => (
            <div className="flex items-center gap-2 whitespace-nowrap">
                <img src={info.getValue().avatar} className="w-6 h-6 rounded-full" alt="avatar" />
                <span className="font-medium">{info.getValue().name}</span>
            </div>
        )
    }),
    columnHelper.accessor('project', { header: 'Project', cell: info => <span className="text-muted-foreground whitespace-nowrap">{info.getValue()}</span> }),
    columnHelper.accessor('address', { header: 'Address', cell: info => <span className="text-muted-foreground whitespace-nowrap">{info.getValue()}</span> }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: info => (
            <div className="flex items-center gap-1 whitespace-nowrap">
                <i className="pi pi-calendar"></i> {/* Add calendar icon if needed */}
                {info.getValue()}
            </div>
        )
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
            const status = info.getValue();
            let color = 'bg-gray-400';
            if (status === 'In Progress') color = 'bg-blue-500';
            if (status === 'Complete') color = 'bg-emerald-500';
            if (status === 'Pending') color = 'bg-blue-300';
            if (status === 'Approved') color = 'bg-amber-400';
            if (status === 'Rejected') color = 'bg-gray-400';

            return (
                <div className="flex items-center gap-2 text-xs whitespace-nowrap">
                    <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                    <span className={status === 'In Progress' ? 'text-blue-500' : status === 'Complete' ? 'text-emerald-500' : 'text-muted-foreground'}>
                        {status}
                    </span>
                </div>
            );
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: () => <button className="hidden group-hover:inline-flex p-1 hover:bg-secondary rounded"><PiDotsThreeOutline /></button>
    })
];

export default function OrderList() {
    const [data] = useState(ORDERS_DATA);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order List</h2>

            <div className="flex justify-between items-center bg-primary-light p-2 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon_sm">
                        <PiPlus />
                    </Button>
                    <Button variant="ghost" size="icon_sm">
                        <PiFunnel />
                    </Button>
                    <Button variant="ghost" size="icon_sm">
                        <PiArrowsDownUp />
                    </Button>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Search" className="bg-background border border-border rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto rounded-lg border border-border/50">
                <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/30 text-muted-foreground text-xs uppercase font-medium">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                <th className="px-4 py-3 w-8"><input type="checkbox" className="rounded border-gray-600 bg-transparent" /></th>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-3 font-medium">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-border/30 bg-background">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="group hover:bg-secondary/20 transition-colors">
                                <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-600 bg-transparent" /></td>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex justify-end gap-2 mt-4 text-sm">
                <button className="px-3 py-1 rounded hover:bg-secondary disabled:opacity-50" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
                <button className="px-3 py-1 bg-secondary rounded text-foreground">1</button>
                <button className="px-3 py-1 rounded hover:bg-secondary disabled:opacity-50" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
            </div>
        </div>
    );
}