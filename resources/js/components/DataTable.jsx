import React from 'react';
import { router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DataTable({
                                      data,
                                      columns,
                                      meta,
                                      baseRoute,
                                      filters,
                                      onFilterChange,
                                      perPageOptions = [5, 10, 25, 50],
                                  }) {
    const [deleteId, setDeleteId] = React.useState(null);

    const handleDeleteConfirm = () => {
        router.delete(route(`${baseRoute}.destroy`, deleteId), {
            onSuccess: () => setDeleteId(null),
    });
    };

    const goToPage = (page) => {
        onFilterChange({
            ...filters,
            page, // ✅ update page in filters
        });
    };

    // Handle filter changes (search, status, perPage)
    const handleFilterChange = (e) => {
        onFilterChange({
            ...filters,
            [e.target.name]: e.target.value,
            page: 1, // reset to first page on filter change
        });
    };

    return (
        <div className="space-y-4 rounded-xl bg-white dark:text-white p-4 text-black shadow">
            {/* Filters */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Input
                    type="text"
                    name="search"
                    placeholder="Search by name, email or role..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="px-3 py-2 md:w-1/3"
                />

                <Select
                    name="status"
                    value={filters.status}
                    // onChange={handleFilterChange}
                    onValueChange={(value) =>
                        handleFilterChange({ target: { name: 'status', value } })
                    }
                    className="px-3 py-2 md:w-1/6"
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    name="perPage"
                    value={Number(filters.perPage)}
                    onValueChange={(value) =>
                        handleFilterChange({ target: { name: 'perPage', value } })
                    }
                    className="px-3 py-2 md:w-1/6"
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {perPageOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt} per page</SelectItem>
                            // <option key={opt} value={opt}>
                            //     {opt} per page
                            // </option>
                        ))}
                    </SelectContent>
                </Select>

                {/*<select name="perPage" value={filters.perPage} onChange={handleFilterChange} className="w-full rounded border px-3 py-2 md:w-1/6">*/}
                {/*    {perPageOptions.map((opt) => (*/}
                {/*        <option key={opt} value={opt}>*/}
                {/*            {opt} per page*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
            </div>

            {/* Table */}
            <table className="min-w-full table-auto">
                <thead className="border-b text-left">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-500">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                <td className="px-4 py-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" className="text-white">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="bottom" align="end" className="bg-white text-black">
                                            <DropdownMenuItem onClick={() => router.visit(route(`${baseRoute}.edit`, row.id))}>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setDeleteId(row.id)}>
                                                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {meta && (
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">
                            Showing <strong>{meta.from}</strong> to <strong>{meta.to}</strong> of <strong>{meta.total}</strong> results
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Previous Button */}
                        <button
                            onClick={() => goToPage(meta.current_page - 1)}
                            disabled={meta.current_page <= 1}
                            className="rounded bg-gray-200 p-2 text-black hover:bg-gray-300 disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {/* Page Numbers */}
                        {[...Array(meta.last_page).keys()].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`rounded px-3 py-1 ${
                                        page === meta.current_page ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            onClick={() => goToPage(meta.current_page + 1)}
                            disabled={meta.current_page >= meta.last_page}
                            className="rounded bg-gray-200 p-2 text-black hover:bg-gray-300 disabled:opacity-50"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <DeleteConfirmationDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDeleteConfirm} />
        </div>
    );
}
